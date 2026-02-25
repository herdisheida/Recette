import styles from "./Header.module.css";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Explore Recipes</h1>
      <div className={styles.controls}>{children}</div>
    </header>
  );
}
