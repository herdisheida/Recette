import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { SearchBar } from "../components/filters/SearchBar";
import { CategoryFilter } from "../components/filters/CategoryFilter";
import { RecipeList } from "../components/recipes/RecipeList";
import { Loading } from "../components/ui/Loading";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { getRecipes, getRecipeTypes } from "../api/recipesApi";
import { filterRecipes } from "../utils/filterRecipes";
import type { RecipeListItem, RecipeType } from "../types/recipe";

// Convert API recipe -> UI recipe list item
function normalizeRecipeListItem(r: any): RecipeListItem {
  const booleanTagKeys = new Set([
    "Meat",
    "Fish",
    "Spicy",
    "Chicken",
    "KidFriendly",
  ]);

  const iconTags = (r.tags ?? [])
    .filter((t: any) => booleanTagKeys.has(t.key) && t.value === true)
    .map((t: any) => (t.key === "KidFriendly" ? "Kid friendly" : t.key));

  return {
    id: r._id,
    title: r.title,
    image: r.image,
    recipeTypeId: r.recipeType, // API gives an ID string
    tags: iconTags,
  };
}

function normalizeRecipeType(t: any): RecipeType {
  return { id: t._id, name: t.name };
}

export function HomePage() {
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [recipeTypes, setRecipeTypes] = useState<RecipeType[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState<string>("All");

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

        setRecipes(recipesRes.map(normalizeRecipeListItem));
        setRecipeTypes(typesRes.map(normalizeRecipeType));
      } catch (e) {
        setError("Something happened while loading recipes.");
      } finally {
        setLoading(false);
      }
    }

    run();
  }, []);

  const filtered = useMemo(() => {
    return filterRecipes(recipes, search, selectedTypeId);
  }, [recipes, search, selectedTypeId]);

  return (
    <div>
      <Header>
        <SearchBar value={search} onChange={setSearch} />
      </Header>

      <main>
        <CategoryFilter
          types={recipeTypes}
          selectedId={selectedTypeId}
          onSelect={setSelectedTypeId}
        />

        {loading && <Loading />}
        {error && <ErrorMessage message={error} />}

        {/* show how many */}
        {!loading && !error && (
          <p style={{ marginTop: 12, marginBottom: 0 }}>
            You have{" "}
            <span style={{ fontWeight: "bold" }}>{filtered.length}</span>{" "}
            recipes to explore.
          </p>
        )}
        {!loading && !error && <RecipeList recipes={filtered} />}
      </main>
    </div>
  );
}
