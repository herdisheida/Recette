import styles from "./CategoryFilter.module.css";

export function CategoryFilter({
  types,
  selected,
  onSelect,
}: {
  types: string[]; // include "All" in the parent
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className={styles.row}>
      {types.map((t) => {
        const active = selected === t;
        return (
          <button
            key={t}
            className={`${styles.pill} ${active ? styles.active : ""}`}
            onClick={() => onSelect(t)}
            type="button"
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
