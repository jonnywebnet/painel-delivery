import { http } from './http';
import type { Recipe, RecipeInput, RecipeListResponse } from '../types';
import { getNordicPresentation } from '../utils/catalogoNordico';
import { traduzirNomeDoPrato } from '../utils/nomesPratos';

function traduzirResposta(response: RecipeListResponse): RecipeListResponse {
  return {
    ...response,
    recipes: response.recipes.map((recipe) => {
      const presentation = getNordicPresentation(recipe.name);
      return {
        ...recipe,
        name: presentation?.name ?? traduzirNomeDoPrato(recipe.name),
        cuisine: presentation?.cuisine ?? recipe.cuisine,
        image: presentation?.image ?? recipe.image,
      };
    }),
  };
}

export async function getRecipes(): Promise<RecipeListResponse> {
  const response = await http.get<RecipeListResponse>('/recipes', { params: { limit: 12 } });
  return traduzirResposta(response.data);
}

export async function searchRecipes(query: string): Promise<RecipeListResponse> {
  const response = await http.get<RecipeListResponse>('/recipes/search', { params: { q: query } });
  return traduzirResposta(response.data);
}

export async function createRecipe(data: RecipeInput): Promise<Recipe> {
  const response = await http.post<Recipe>('/recipes/add', data);
  return { ...response.data, name: traduzirNomeDoPrato(response.data.name) };
}

export async function updateRecipe(id: number, data: RecipeInput): Promise<Recipe> {
  const response = await http.patch<Recipe>(`/recipes/${id}`, data);
  return { ...response.data, name: traduzirNomeDoPrato(response.data.name) };
}

export async function deleteRecipe(id: number): Promise<void> {
  await http.delete(`/recipes/${id}`);
}
