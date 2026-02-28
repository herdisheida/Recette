import styles from "./Header.module.css";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className={styles.header}>
      <p className={styles.title}>Explore Recipes</p>
      <div className={styles.controls}>{children}</div>
    </header>
  );
}
