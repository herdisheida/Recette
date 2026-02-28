import type {
  ApiRecipeListItem,
  ApiRecipeType,
  ApiRecipeDetails,
} from "../types/api";

// getting recipes from base_url
const BASE_URL = "http://localhost:3500"; // change if needed

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function getRecipes() {
  return safeFetch<ApiRecipeListItem[]>(`${BASE_URL}/recipes`);
}

export function getRecipeTypes() {
  return safeFetch<ApiRecipeType[]>(`${BASE_URL}/recipes/recipeTypes`);
}

export function getRecipeById(recipeId: string) {
  return safeFetch<ApiRecipeDetails>(`${BASE_URL}/recipes/${recipeId}`);
}
