import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Recipe, RecipeInput } from '../types';
import Icon from './Icon';

interface RecipeFormProps { recipe?: Recipe | null; isSubmitting: boolean; onSubmit: (data: RecipeInput) => Promise<void>; onCancel: () => void; }
interface FormValues { name: string; cuisine: string; image: string; prepTimeMinutes: string; cookTimeMinutes: string; }
const emptyValues: FormValues = { name: '', cuisine: '', image: '', prepTimeMinutes: '0', cookTimeMinutes: '0' };
function recipeToFormValues(recipe: Recipe | null | undefined): FormValues { return recipe ? { name: recipe.name, cuisine: recipe.cuisine, image: recipe.image, prepTimeMinutes: String(recipe.prepTimeMinutes), cookTimeMinutes: String(recipe.cookTimeMinutes) } : emptyValues; }

export default function RecipeForm({ recipe, isSubmitting, onSubmit, onCancel }: RecipeFormProps) {
  const [values, setValues] = useState<FormValues>(() => recipeToFormValues(recipe));
  const [validationError, setValidationError] = useState('');
  useEffect(() => { setValues(recipeToFormValues(recipe)); setValidationError(''); }, [recipe]);
  function updateValue(field: keyof FormValues, value: string) { setValues((current) => ({ ...current, [field]: value })); }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prepTime = Number(values.prepTimeMinutes); const cookTime = Number(values.cookTimeMinutes);
    if (!values.name.trim() || !values.cuisine.trim() || !values.image.trim()) { setValidationError('Preencha nome, cozinha e imagem.'); return; }
    if (!Number.isFinite(prepTime) || !Number.isFinite(cookTime) || prepTime < 0 || cookTime < 0) { setValidationError('Os tempos devem ser números maiores ou iguais a zero.'); return; }
    setValidationError(''); await onSubmit({ name: values.name.trim(), cuisine: values.cuisine.trim(), image: values.image.trim(), prepTimeMinutes: prepTime, cookTimeMinutes: cookTime });
  }
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="recipe-form-title"><div className="modal-header"><div><span className="section-kicker">{recipe ? 'Editar catálogo' : 'Novo item'}</span><h2 id="recipe-form-title">{recipe ? 'Atualizar prato' : 'Adicionar prato'}</h2></div><button className="icon-button" type="button" onClick={onCancel} disabled={isSubmitting} aria-label="Fechar formulário"><Icon name="close" /></button></div><p className="modal-description">{recipe ? 'Ajuste as informações para manter seu cardápio impecável.' : 'Cadastre os detalhes do prato que vai conquistar seus clientes.'}</p>
        <form onSubmit={handleSubmit} className="recipe-form"><div className="field"><label htmlFor="recipe-name">Nome do prato</label><input id="recipe-name" value={values.name} onChange={(event) => updateValue('name', event.target.value)} aria-invalid={Boolean(validationError && !values.name)} placeholder="Ex.: Risoto de cogumelos" required /></div><div className="field"><label htmlFor="recipe-cuisine">Categoria / cozinha</label><input id="recipe-cuisine" value={values.cuisine} onChange={(event) => updateValue('cuisine', event.target.value)} aria-invalid={Boolean(validationError && !values.cuisine)} placeholder="Ex.: Italiana" required /></div><div className="field field-wide"><label htmlFor="recipe-image">URL da imagem</label><input id="recipe-image" type="url" value={values.image} onChange={(event) => updateValue('image', event.target.value)} aria-invalid={Boolean(validationError && !values.image)} placeholder="https://..." required /></div><div className="field"><label htmlFor="recipe-prep-time">Preparo (min)</label><input id="recipe-prep-time" type="number" min="0" value={values.prepTimeMinutes} onChange={(event) => updateValue('prepTimeMinutes', event.target.value)} required /></div><div className="field"><label htmlFor="recipe-cook-time">Cozimento (min)</label><input id="recipe-cook-time" type="number" min="0" value={values.cookTimeMinutes} onChange={(event) => updateValue('cookTimeMinutes', event.target.value)} required /></div>{validationError && <p className="error-message field-wide" role="alert">{validationError}</p>}<div className="modal-actions field-wide"><button className="button button-secondary" type="button" onClick={onCancel} disabled={isSubmitting}>Cancelar</button><button className="button button-primary" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : recipe ? 'Salvar alterações' : 'Adicionar prato'}</button></div></form>
      </section>
    </div>
  );
}
