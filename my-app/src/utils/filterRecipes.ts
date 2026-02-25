import { RecipeCategory, RecipeListItem } from "../types/recipe";

export function filterRecipes(
  recipes: RecipeListItem[],
  searchText: string,
  category: string, // category
) {
  const s = searchText.trim().toLowerCase();

  return recipes.filter((r) => {
    const matchesSearch = s === "" || r.title.toLowerCase().includes(s);

    const matchesCategory =
      category === "All" ||
      r.tags.includes(category as any) ||
      (r as any).category === category; // TODO remove any type þegar ég veit hvernig category í mongodb stuffinu

    return matchesSearch && matchesCategory;
  });
}
