export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  accessToken: string;
}

export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
}

export type RecipeInput = Omit<Recipe, 'id'>;

export interface RecipeListResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
