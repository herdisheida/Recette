import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api/recipesApi";
import { Loading } from "../components/ui/Loading";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { RecipeDetails } from "../types/recipe";

function getTagValue(tags: any[], key: string) {
  const found = (tags ?? []).find((t) => t.key === key);
  return found?.value;
}

function normalizeRecipeDetails(r: any) {
  const ingredients = (r.ingredients ?? []).map((x: any) =>
    typeof x === "string" ? x : x.ingredient,
  );

  const instructions = (r.instructions ?? []).map((x: any) =>
    typeof x === "string" ? x : (x.instruction ?? x.step ?? x.text),
  );

  return {
    id: r._id,
    title: r.title,
    image: r.image,
    recipeTypeId: r.recipeType,
    author: r.author ?? "",
    description: r.description ?? "",
    ingredients,
    instructions,
    calories: Number(getTagValue(r.tags, "Calories") ?? 0),
    totalMinutes: Number(getTagValue(r.tags, "TotalMinutes") ?? 0),
    tags: [], // not needed on details
  };
}

export function RecipeDetailsPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      if (!recipeId) return;
      try {
        setLoading(true);
        setError(null);
        const res = await getRecipeById(recipeId);
        setRecipe(normalizeRecipeDetails(res));
      } catch {
        setError("Something happened while loading recipe details.");
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [recipeId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) return <ErrorMessage message="Recipe not found." />;

  return (
    <div>
      <div style={{ height: 520, overflow: "hidden" }}>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
        <h1 style={{ marginBottom: 6 }}>{recipe.title}</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>By {recipe.author}</p>

        <div style={{ display: "flex", gap: 10, margin: "12px 0" }}>
          <span>🔥 {recipe.calories} Calories</span>
          <span>⏱️ {recipe.totalMinutes} Minutes</span>
        </div>

        <p>{recipe.description}</p>

        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>

        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </main>
    </div>
  );
}
