import { useState } from "react";
import NewTodoForm from "./NewTodoForm/NewTodoForm";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos, createTodo, setTodoDone, deleteTodo } from "../services/todoService";

function loadTodoList() {
  const saved = localStorage.getItem("todoList");
  return saved ? JSON.parse(saved) : []
}

// initialTodo never used now that we use local storage.
export default function TodoList({ firstName, userID }) {
  const [todoList, setTodoList] = useState([]);

  // when [todoList] array changes, it is turned into a string and saved under the key "todoList"
  useEffect(() => {
    async function load() {
      const todos = await fetchTodos();
      const filteredTodos = todos.filter((task) => (task.owner === userID) )
      setTodoList(filteredTodos);
    }
    load();
  }, [userID]); 

async function handleAdd(task) {
   try {const created = await createTodo(task);
   setTodoList([...todoList, created]);}
   catch (error) {
    console.error("could not create todo", error);
   }
  }

  async function handleToggle(id) {
    const task = todoList.find((todo) => todo.id === id);
    await setTodoDone(id, !task.done);
    setTodoList(todoList.map((t) => (t.id === id ? {...t, done: !t.done} : t )));
  }

  async function handleRemove(deleteId) {
    await deleteTodo(deleteId);
    setTodoList(todoList.filter((task) => task.id !== deleteId));
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
