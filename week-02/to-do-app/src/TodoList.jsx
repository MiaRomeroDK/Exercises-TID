import { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoItem from "./TodoItem";
import { useEffect } from "react";

function loadTodoList() {
  const saved = localStorage.getItem("todoList");
  return saved ? JSON.parse(saved) : []
}

// initialTodo never used now that we use local storage.
export default function TodoList({ firstName, initialTodoList }) {
  const [todoList, setTodoList] = useState(loadTodoList);

  // when [todoList] array changes, it is turned into a string and saved under the key "todoList"
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList))
  }, [todoList]); 

  function handleAdd(task) {
    const newItem = {
      id: crypto.randomUUID(),
      text: task,
      done: false,
    };
    setTodoList([...todoList, newItem]);
    console.log(todoList);
  }

  function handleToggle(id) {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function handleRemove(id) {
    setTodoList(todoList.filter((task) => task.id !== id));
  }

  return (
    <>
      <h1>Stuff that {firstName} needs to get done:</h1>

      {todoList.length === 0 ? (
        <h2>Nothing to do, lay down on the couch!</h2>
      ) : (
        <>
          <h2>{todoList.length} things to do!</h2>

          <ul>
            {todoList.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onRemove={handleRemove}
              />
            ))}
          </ul>
        </>
      )}

      <NewTodoForm onAdd={handleAdd} />
    </>
  );
}
