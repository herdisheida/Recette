import styles from "./SearchBar.module.css";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      className={styles.input}
      placeholder="Search recipes…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
