import type { Recipe } from '../types';
import Icon from './Icon';

interface RecipeCardProps { recipe: Recipe; onEdit: (recipe: Recipe) => void; onDelete: (recipe: Recipe) => void; }

function calculatePrice(recipe: Recipe): number { return 15 + 0.5 * (recipe.prepTimeMinutes + recipe.cookTimeMinutes); }

export default function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
  const price = calculatePrice(recipe).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return (
    <article className="recipe-card">
      <div className="recipe-image-wrap"><img src={recipe.image} alt={`Foto do prato ${recipe.name}`} /><span className="availability-badge"><i /> Disponível</span><button className="icon-button image-more" type="button" aria-label={`Mais opções de ${recipe.name}`}><Icon name="more" /></button></div>
      <div className="recipe-card-content"><div className="recipe-card-heading"><div><span className="recipe-category">{recipe.cuisine}</span><h3>{recipe.name}</h3></div><strong>{price}</strong></div><div className="recipe-meta"><span><Icon name="clock" /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span><span className="dot" /> <span>Preço sugerido</span></div><div className="card-actions"><button className="button button-secondary" type="button" onClick={() => onEdit(recipe)}><Icon name="edit" /> Editar</button><button className="button button-danger" type="button" onClick={() => onDelete(recipe)} aria-label={`Excluir ${recipe.name}`}><Icon name="trash" /></button></div></div>
    </article>
  );
}
