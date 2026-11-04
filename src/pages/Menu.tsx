import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Icon from '../components/Icon';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import { useAuth } from '../contexts/AuthContext';
import { createRecipe, deleteRecipe, getRecipes, searchRecipes, updateRecipe } from '../services/recipes';
import type { Recipe, RecipeInput } from '../types';
import { traduzirErro } from '../utils/erros';

export default function Menu() {
  const { logout } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchResults, setSearchResults] = useState<Recipe[] | null>(null);
  const [search, setSearch] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('Todas');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      setIsLoading(true);
      setError('');
      try {
        const response = await getRecipes();
        setRecipes(response.recipes);
      } catch (requestError) {
        setError(traduzirErro(requestError, 'lista'));
      } finally {
        setIsLoading(false);
      }
    }
    void loadRecipes();
  }, []);

  useEffect(() => {
    const query = search.trim();
    if (query.length < 2) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    let isCurrentRequest = true;
    async function loadSearchResults() {
      setIsSearching(true);
      try {
        const response = await searchRecipes(query);
        if (isCurrentRequest) setSearchResults(response.recipes);
      } catch (requestError) {
        if (isCurrentRequest) {
          setSearchResults([]);
          setError(traduzirErro(requestError, 'lista'));
        }
      } finally {
        if (isCurrentRequest) setIsSearching(false);
      }
    }
    void loadSearchResults();
    return () => { isCurrentRequest = false; };
  }, [search]);

  const cuisines = useMemo(() => ['Todas', ...Array.from(new Set(recipes.map((recipe) => recipe.cuisine)))], [recipes]);
  const recipesToDisplay = searchResults ?? recipes;
  const filteredRecipes = useMemo(() => recipesToDisplay.filter((recipe) => {
    const matchesName = recipe.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCuisine = cuisineFilter === 'Todas' || recipe.cuisine === cuisineFilter;
    return matchesName && matchesCuisine;
  }), [recipesToDisplay, search, cuisineFilter]);

  function clearSearch() { setSearch(''); setSearchResults(null); }
  function openCreateForm() { setNotice(''); setError(''); setEditingRecipe(null); setIsFormOpen(true); }
  function openEditForm(recipe: Recipe) { setNotice(''); setError(''); setEditingRecipe(recipe); setIsFormOpen(true); }
  function closeForm() { if (!isSubmitting) { setEditingRecipe(null); setIsFormOpen(false); } }

  async function handleSave(data: RecipeInput) {
    setIsSubmitting(true); setError(''); setNotice('');
    try {
      if (editingRecipe) {
        const updatedRecipe = await updateRecipe(editingRecipe.id, data);
        setRecipes((current) => current.map((recipe) => recipe.id === editingRecipe.id ? { ...recipe, ...updatedRecipe, ...data } : recipe));
        setNotice('Prato atualizado com sucesso.');
      } else {
        const createdRecipe = await createRecipe(data);
        setRecipes((current) => [...current, { ...createdRecipe, ...data }]);
        setNotice('Prato adicionado ao cardápio.');
      }
      clearSearch(); closeForm();
    } catch (requestError) {
      if (editingRecipe && editingRecipe.id === 51 && axios.isAxiosError(requestError) && requestError.response?.status === 404) {
        setRecipes((current) => current.map((recipe) => recipe.id === 51 ? { ...recipe, ...data } : recipe));
        setNotice('A API simulou o 404, então o prato foi atualizado localmente.');
        clearSearch(); closeForm();
      } else setError(traduzirErro(requestError));
    } finally { setIsSubmitting(false); }
  }

  async function handleDelete(recipe: Recipe) {
    if (!window.confirm(`Deseja excluir o prato “${recipe.name}”?`)) return;
    setError(''); setNotice('');
    try {
      await deleteRecipe(recipe.id);
      setRecipes((current) => current.filter((item) => item.id !== recipe.id));
      setNotice('Prato removido do cardápio.'); clearSearch();
    } catch (requestError) {
      if (recipe.id === 51 && axios.isAxiosError(requestError) && requestError.response?.status === 404) {
        setRecipes((current) => current.filter((item) => item.id !== recipe.id));
        setNotice('A API simulou o 404, então o prato local foi removido da tela.'); clearSearch();
      } else setError(traduzirErro(requestError));
    }
  }

  const displayName = 'Jhonatan Gomes';
  const isBusy = isLoading || isSearching;

  return (
    <div className="app-layout">
      <Header userName={displayName} onLogout={logout} />
      <main className="app-main">
        <div className="topbar"><div><span className="date-label">GESTÃO DO RESTAURANTE</span><h1>Seu cardápio</h1></div><div className="online-pill"><span /> Aberto agora</div></div>
        <section className="menu-intro"><div><span className="section-kicker">Catálogo de produtos</span><h2>Pratos que dão vontade.</h2><p>Organize, atualize e acompanhe tudo que sai da sua cozinha.</p></div><button className="button button-primary add-button" type="button" onClick={openCreateForm}><Icon name="plus" /> Novo prato</button></section>

        <section className="menu-toolbar" aria-label="Filtros do cardápio">
          <label className="search-box" htmlFor="recipe-search"><Icon name="search" /><span className="sr-only">Buscar por nome</span><input id="recipe-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar um prato..." /></label>
          <label className="select-box" htmlFor="cuisine-filter"><span className="sr-only">Filtrar por cozinha</span><select id="cuisine-filter" value={cuisineFilter} onChange={(event) => setCuisineFilter(event.target.value)}>{cuisines.map((cuisine) => <option key={cuisine} value={cuisine}>{cuisine === 'Todas' ? 'Todas as cozinhas' : cuisine}</option>)}</select><Icon name="chevron" /></label>
          <span className="results-count">{filteredRecipes.length} {filteredRecipes.length === 1 ? 'prato' : 'pratos'}</span>
        </section>

        {notice && <p className="success-message" role="status"><Icon name="check" /> {notice}</p>}
        {error && <p className="error-message" role="alert">{error}</p>}
        {isBusy && <div className="page-state loading-state"><span className="spinner" /> {isSearching ? 'Buscando pratos...' : 'Carregando seu cardápio...'}</div>}
        {!isBusy && !error && filteredRecipes.length === 0 && <div className="empty-state"><div className="empty-icon"><Icon name="menu" /></div><h2>{search || cuisineFilter !== 'Todas' ? 'Nenhum prato encontrado' : 'Seu cardápio começa aqui'}</h2><p>{search || cuisineFilter !== 'Todas' ? 'Tente mudar os filtros ou buscar outro nome.' : 'Adicione o primeiro prato e comece a montar uma experiência incrível.'}</p><button className="button button-primary" type="button" onClick={openCreateForm}><Icon name="plus" /> Adicionar primeiro prato</button></div>}
        {!isBusy && !error && filteredRecipes.length > 0 && <div className="recipe-grid">{filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onEdit={openEditForm} onDelete={handleDelete} />)}</div>}
      </main>
      {isFormOpen && <RecipeForm recipe={editingRecipe} isSubmitting={isSubmitting} onSubmit={handleSave} onCancel={closeForm} />}
    </div>
  );
}
