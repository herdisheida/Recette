import { RecipeListItem } from "../../types/recipe";
import { RecipeCard } from "./RecipeCard";

export function RecipeList({ recipes }: { recipes: RecipeListItem[] }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      }}
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
