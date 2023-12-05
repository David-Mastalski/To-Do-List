import { useState } from "react";
import { Error } from "../Error/Error";
import styles from "./Form.module.css";

export function Form({
  children,
  currentInputValue,
  onFormSubmit,
  editedTaskID,
  errorMessage,
}) {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [inputValue, setInputValue] = useState(
    currentInputValue ? currentInputValue : ""
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (editedTaskID) {
          onFormSubmit(inputValue, editedTaskID);
        } else {
          onFormSubmit(inputValue);
          setInputValue("");
        }
      }}
      className={styles.form}
    >
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsErrorShown(false);
          }}
          className={styles.input}
        />
        {children}
      </div>
      {isErrorShown && <Error>{errorMessage}</Error>}
    </form>
  );
}
