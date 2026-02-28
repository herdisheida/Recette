import styles from "./SearchBar.module.css";
// import magnifyingGlassIcon from "../../images/magnifying-glass-solid.png";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.searchIcon}>🔎</div>
      <input
        className={styles.input}
        placeholder="Search for recipes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
