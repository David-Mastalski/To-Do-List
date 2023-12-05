import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "./Item.module.css";
import { Form } from "../Form/Form";
import { Button } from "../Button/Button";
import { useState } from "react";

export function Item({
  children,
  innerRef,
  dragHandleProps,
  draggableProps,
  id,
  status,
  setTodos,
}) {
  const [isEditTask, setIsEditTask] = useState(false);

  function handleSaveClick(editedTaskName, editedTaskID) {
    setTodos((prevTodosState) =>
      prevTodosState.map((todo) =>
        todo.id === editedTaskID ? { ...todo, name: editedTaskName } : todo
      )
    );
    setIsEditTask(false);
  }

  function handleDoneClick() {
    setTodos((prevTodosState) =>
      prevTodosState.map((todo) =>
        todo.id === id ? { ...todo, done: true } : todo
      )
    );
  }

  function handleDeleteClick() {
    setTodos((prevTodosState) =>
      prevTodosState.filter((todo) => todo.id !== id)
    );
  }

  return (
    <li
      ref={innerRef}
      {...dragHandleProps}
      {...draggableProps}
      className={styles.item}
    >
      {!isEditTask ? (
        <div className={styles.taskContainer}>
          <button
            onClick={() => setIsEditTask(true)}
            disabled={status}
            className={styles.editButton}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <p className={status ? styles.done : ""}>{children}</p>
          <div className={styles.buttonContainer}>
            {!status && <Button onClick={handleDoneClick}>Zrobione</Button>}
            <Button onClick={handleDeleteClick}>Usuń</Button>
          </div>
        </div>
      ) : (
        <Form
          editedTaskID={id}
          onFormSubmit={handleSaveClick}
          currentInputValue={children}
          errorMessage="Edytowane zadanie nie może być puste !!"
        >
          <Button onClick={() => setIsEditTask(false)} type="button">
            Anuluj
          </Button>
          <Button>Zapisz</Button>
        </Form>
      )}
    </li>
  );
}
