import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Parse from "parse";
import TodoItem from "../components/TodoItem";
import { fetchTodosForList, createTodo, setTodoDone, deleteTodo } from "../services/todoService";
import NewTodoForm from "../components/NewTodoForm/NewTodoForm";

const List = Parse.Object.extend("List");

export default function ListPage() {
  const { listID } = useParams();
  const [list, setList] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      const listQuery = new Parse.Query(List);
      const list = await listQuery.get(listID);
      const todos = await fetchTodosForList(list);

      setList(list);
      setTodos(todos);
    }
    load();
  }, [listID]);

async function handleAddTask(newTask, list) {
   try {
      const created = await createTodo(newTask, list);
      setTodos([...todos, created]);
    }
   catch (error) {
    console.error("could not create todo", error);
   }
  }

async function handleToggle(id) {
    const task = todos.find((todo) => todo.id === id);
    await setTodoDone(id, !task.done);
    setTodos(todos.map((todo) => (todo.id === id ? {...todo, done: !todo.done} : todo)));
}

async function handleRemove(deleteId) {
    await deleteTodo(deleteId);
    setTodos(todos.filter((todo) => todo.id !== deleteId));
}

if (!list) {
    return <h6>Loading... </h6>
}

return (
    <>
    <Link to="/">Back to lists</Link>
    <h1>{list.get("name")}</h1>
    <ul>
        {todos.map((todo) => (
            <TodoItem 
                key={todo.id} 
                task={todo}
                onToggle={handleToggle}
                onRemove={handleRemove}
            />
        ))}
    </ul>
     <NewTodoForm onAdd={(newTask) => handleAddTask(newTask, list)} />
    </>
)

}
