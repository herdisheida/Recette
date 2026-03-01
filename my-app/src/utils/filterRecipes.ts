import type { RecipeListItem } from "../types/recipe";

export function filterRecipes(
  recipes: RecipeListItem[],
  searchText: string,
  selectedTypeId: string,
): RecipeListItem[] {
  const s = searchText.trim().toLowerCase();

  return recipes.filter((r) => {
    const matchesSearch = s === "" || r.title.toLowerCase().includes(s);
    const matchesType =
      selectedTypeId === "All" || r.recipeTypeId === selectedTypeId;
    return matchesSearch && matchesType;
  });
}
