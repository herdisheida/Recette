import type {
  ApiRecipeListItem,
  ApiRecipeType,
  ApiRecipeDetails,
} from "../types/api";

// getting recipes from base_url
const BASE_URL = "http://localhost:3500"; // change if needed

async function safeFetch<T>(url: string): Promise<T> {
  const res: Response = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function getRecipes(): Promise<ApiRecipeListItem[]> {
  return safeFetch<ApiRecipeListItem[]>(`${BASE_URL}/recipes`);
}

export function getRecipeTypes(): Promise<ApiRecipeType[]> {
  return safeFetch<ApiRecipeType[]>(`${BASE_URL}/recipes/recipeTypes`);
}

export function getRecipeById(recipeId: string): Promise<ApiRecipeDetails> {
  return safeFetch<ApiRecipeDetails>(`${BASE_URL}/recipes/${recipeId}`);
}
