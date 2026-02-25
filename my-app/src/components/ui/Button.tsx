import styles from "./Button.module.css";
// TODO fix import button styles - doesn't work

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles[variant]} ${className}`}
    />
  );
}