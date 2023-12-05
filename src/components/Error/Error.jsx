import styles from "./Error.module.css";

export function Error({ children }) {
  return <p className={`${styles.errorMessage}`}>{children}</p>;
}
