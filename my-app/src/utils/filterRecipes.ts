export function filterRecipes(
  recipes: any[],
  searchText: string,
  selectedTypeId: string,
) {
  const s = searchText.trim().toLowerCase();

  return recipes.filter((r) => {
    const matchesSearch = s === "" || r.title.toLowerCase().includes(s);
    const matchesType =
      selectedTypeId === "All" || r.recipeTypeId === selectedTypeId;
    return matchesSearch && matchesType;
  });
}
