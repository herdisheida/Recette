/* getting recipes from base_url */

const BASE_URL = "http://localhost:3500"; // change if needed

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

// TODO remove any type replac with correct types when they are defined in types/recipe.ts
export function getRecipes() {
  return safeFetch<any[]>(`${BASE_URL}/recipes`);
}

export function getRecipeTypes() {
  return safeFetch<any[]>(`${BASE_URL}/recipes/recipeTypes`);
}

export function getRecipeById(recipeId: string) {
  return safeFetch<any>(`${BASE_URL}/recipes/${recipeId}`);
}
