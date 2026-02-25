import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { SearchBar } from "../components/filters/SearchBar";
import { CategoryFilter } from "../components/filters/CategoryFilter";
import { RecipeList } from "../components/recipes/RecipeList";
import { Loading } from "../components/ui/Loading";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { getRecipes, getRecipeTypes } from "../api/recipesApi";
import { filterRecipes } from "../utils/filterRecipes";
import { RecipeListItem } from "../types/recipe";

export function HomePage() {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [types, setTypes] = useState<string[]>(["All"]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        setError(null);

        const [recipesRes, typesRes] = await Promise.all([
          getRecipes(),
          getRecipeTypes(),
        ]);

        // map API -> my types
        setRecipes(recipesRes); // TODO later maybe fix

        // types endpoint + static "All"
        setTypes(["All", ...typesRes.map((t: any) => t.title ?? t)]);
      } catch (e: any) {
        setError("Something happened while loading recipes.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  const filtered = useMemo(
    () => filterRecipes(recipes, search, selectedType),
    [recipes, search, selectedType],
  );

  return (
    <div>
      <Header>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          types={types}
          selected={selectedType}
          onSelect={setSelectedType}
        />
      </Header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <RecipeList recipes={filtered} />}
      </main>
    </div>
  );
}
