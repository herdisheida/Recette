import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { SearchBar } from "../components/filters/SearchBar";
import { CategoryFilter } from "../components/filters/CategoryFilter";
import { RecipeList } from "../components/recipes/RecipeList";
import { Loading } from "../components/ui/Loading";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { getRecipes, getRecipeTypes } from "../api/recipesApi";
import { filterRecipes } from "../utils/filterRecipes";
import style from "./HomePage.module.css";
import type { ApiRecipeListItem, ApiTag, ApiRecipeType } from "../types/api";
import {
  RecipeTag,
  type RecipeListItem,
  type RecipeType,
} from "../types/recipe";

/*
code starts
*/
const TAG_MAP = {
  Meat: RecipeTag.Meat,
  Fish: RecipeTag.Fish,
  Spicy: RecipeTag.Spicy,
  Chicken: RecipeTag.Chicken,
  KidFriendly: RecipeTag.KidFriendly,
} as const;

type TagMapKey = keyof typeof TAG_MAP;

function isTagMapKey(key: string): key is TagMapKey {
  return Object.prototype.hasOwnProperty.call(TAG_MAP, key);
}

function isIconTag(t: ApiTag): t is ApiTag & { key: TagMapKey } {
  return t.value === true && isTagMapKey(t.key);
}

function normalizeRecipeListItem(r: ApiRecipeListItem): RecipeListItem {
  // only include tags that are true and in our TAG_MAP
  const iconTags: RecipeTag[] = r.tags
    .filter(isIconTag)
    .map((t) => TAG_MAP[t.key]);

  return {
    id: r._id,
    title: r.title,
    image: r.image,
    recipeTypeId: r.recipeType,
    tags: iconTags,
  };
}

function normalizeRecipeType(t: ApiRecipeType): RecipeType {
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
    <div className={style.container}>
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
          <p className={style.resultCount}>
            You have <span className={style.count}>{filtered.length}</span>{" "}
            recipes to explore.
          </p>
        )}
        {!loading && !error && <RecipeList recipes={filtered} />}
      </main>
    </div>
  );
}
