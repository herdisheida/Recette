import { Link } from "react-router-dom";
import { RecipeListItem } from "../../types/recipe";
import styles from "./RecipeCard.module.css";

function tagIcon(tag: string) {
  // simple emoji icons (easy first time)
  if (tag === "Meat") return "🥩";
  if (tag === "Fish") return "🐟";
  if (tag === "Spicy") return "🌶️";
  if (tag === "Chicken") return "🍗";
  if (tag === "Kid friendly") return "🧒";
  return "🏷️";
}

export function RecipeCard({ recipe }: { recipe: RecipeListItem }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className={styles.card}>
      <img className={styles.image} src={recipe.image} alt={recipe.title} />
      <div className={styles.body}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <div className={styles.tags}>
          {recipe.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {tagIcon(t)} {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
