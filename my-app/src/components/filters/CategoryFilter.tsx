import styles from "./CategoryFilter.module.css";
import type { RecipeType } from "../../types/recipe";

export function CategoryFilter({
  types,
  selectedId,
  onSelect,
}: {
  types: RecipeType[];
  selectedId: string; // "All" or recipeType id
  onSelect: (id: string) => void;
}) {
  return (
    <div className={styles.row}>
      <button
        className={`${styles.pill} ${selectedId === "All" ? styles.active : ""}`}
        onClick={() => onSelect("All")}
        type="button"
      >
        ALL
      </button>

      {types.map((t) => {
        const active = selectedId === t.id;
        return (
          <button
            key={t.id}
            className={`${styles.pill} ${active ? styles.active : ""}`}
            onClick={() => onSelect(t.id)}
            type="button"
          >
            {t.name.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
