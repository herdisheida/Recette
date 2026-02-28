import { RecipeListItem } from "../../types/recipe";
import { RecipeCard } from "./RecipeCard";
import styles from "./RecipeList.module.css";

export function RecipeList({ recipes }: { recipes: RecipeListItem[] }) {
  return (
    <div className={styles.list}>
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
