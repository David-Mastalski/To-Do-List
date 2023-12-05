import styles from "./Button.module.css";

export function Button({ children, type, onClick }) {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}
