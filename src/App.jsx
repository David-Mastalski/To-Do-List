import { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { Form } from "./components/Form/Form";
import { Item } from "./components/Item/Item";
import { getSubHeading } from "./utils/getSubHeading";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  // localStorage.removeItem("tasks");

  const [isInputShow, setIsInputShow] = useState(false);
  // const [todos, setTodos] = useState([
  //   { id: 1, name: "Kupić nowe BMW M3", done: false },
  //   { id: 2, name: "Iść na spacer z pieskiem", done: false },
  //   { id: 3, name: "Naprawić odpływ w garażu", done: true },
  // ]);

  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [
    { id: 1, name: "Kupić nowe BMW M3", done: false },
    { id: 2, name: "Iść na spacer z Daisy", done: false },
    { id: 3, name: "Naprawić odpływ w garażu", done: true },
  ];
  const [todos, setTodos] = useState(initialTasks);

  useEffect(() => {
    const tasksJSON = JSON.stringify(todos);

    localStorage.setItem("tasks", tasksJSON);
  }, [todos]);

  function handleFormSubmit(newTaskName) {
    setTodos((prevTodosState) => [
      ...prevTodosState,
      {
        id: prevTodosState.length === 0 ? 0 : prevTodosState.at(-1).id + 1,
        name: newTaskName,
        done: false,
      },
    ]);
    setIsInputShow(false);
  }

  function handleDragDropEnd(result) {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const updatedTodos = [...todos];
    const [reorderedItem] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, reorderedItem);

    setTodos(updatedTodos);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Do zrobienia</h1>
          <h2>{getSubHeading(todos.length)}</h2>
        </div>
        {!isInputShow && (
          <button
            onClick={() => setIsInputShow(true)}
            className={styles.button}
          >
            +
          </button>
        )}
      </header>
      {isInputShow && (
        <Form
          onFormSubmit={handleFormSubmit}
          errorMessage="Aby dodać zadanie, podaj jego treść !!"
        >
          <Button>Dodaj</Button>
        </Form>
      )}
      <DragDropContext onDragEnd={handleDragDropEnd}>
        <Droppable droppableId="root">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.list}
            >
              {todos.map((todo, index) => (
                <Draggable
                  draggableId={todo.id.toString()}
                  key={todo.id}
                  index={index}
                >
                  {(provided) => (
                    <Item
                      innerRef={provided.innerRef}
                      dragHandleProps={{ ...provided.dragHandleProps }}
                      draggableProps={{ ...provided.draggableProps }}
                      id={todo.id}
                      status={todo.done}
                      setTodos={setTodos}
                    >
                      {todo.name}
                    </Item>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
