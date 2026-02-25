import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeById } from "../api/recipesApi";
import { Loading } from "../components/ui/Loading";
import { ErrorMessage } from "../components/ui/ErrorMessage";

type ApiTag = { key: string; value: any };
type ApiIngredient = { ingredient: string };
type ApiInstruction = { step: number; description: string };

type UiRecipeDetails = {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  recipeTypeId: string;

  calories: number;
  totalMinutes: number;

  ingredients: string[];
  instructions: { step: number; description: string }[];
};

function getTagValue(tags: ApiTag[] | undefined, key: string) {
  return (tags ?? []).find((t) => t.key === key)?.value;
}

function normalizeRecipeDetails(r: any): UiRecipeDetails {
  const ingredients = (r.ingredients ?? []).map(
    (x: ApiIngredient) => x.ingredient,
  );

  const instructions = (r.instructions ?? []).map((x: ApiInstruction) => ({
    step: x.step,
    description: x.description,
  }));

  return {
    id: r._id,
    title: r.title,
    author: r.author ?? "",
    description: r.description ?? "",
    image: `data:image/png;base64,${r.image}`,
    recipeTypeId: r.recipeType,

    calories: Number(getTagValue(r.tags, "Calories") ?? 0),
    totalMinutes: Number(getTagValue(r.tags, "TotalMinutes") ?? 0),

    ingredients,
    instructions,
  };
}

export function RecipeDetailsPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<UiRecipeDetails | null>(null);
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
      } catch (e) {
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
      {/* cover image (520px height) */}
      <div style={{ height: 520, overflow: "hidden" }}>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
        <Link to="/" style={{ display: "inline-block", marginBottom: 12 }}>
          ← Back
        </Link>

        <h1 style={{ marginBottom: 6 }}>{recipe.title}</h1>
        <p style={{ marginTop: 0, opacity: 0.8 }}>By {recipe.author}</p>

        {/* Calories + TotalMinutes tags */}
        <div style={{ display: "flex", gap: 16, margin: "12px 0" }}>
          <span> {recipe.calories} Calories</span>
          <span> {recipe.totalMinutes} Minutes</span>
        </div>

        <p>{recipe.description}</p>

        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>

        <h2>Instructions</h2>
        <ol>
          {recipe.instructions
            .sort((a, b) => a.step - b.step)
            .map((stepObj) => (
              <li key={stepObj.step}>{stepObj.description}</li>
            ))}
        </ol>
      </main>
    </div>
  );
}
