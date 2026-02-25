import styles from "./CategoryFilter.module.css";

export function CategoryFilter({
  types,
  selectedId,
  onSelect,
}: {
  types: { id: string; name: string }[];
  selectedId: string; // "All" or id
  onSelect: (id: string) => void;
}) {
  return (
    <div className={styles.row}>
      <button
        className={`${styles.pill} ${selectedId === "All" ? styles.active : ""}`}
        onClick={() => onSelect("All")}
        type="button"
      >
        All
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
            {t.name}
          </button>
        );
      })}
    </div>
  );
}
