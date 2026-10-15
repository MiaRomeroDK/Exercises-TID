import { useState } from "react";
import NewTodoForm from "../NewTodoForm";
import TodoItem from "../TodoItem";
import { useEffect } from "react";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
  fetchTodosForList,
} from "../../services/todoService";
import { createList, fetchLists } from "../../services/listService";
import NewListForm from "../NewListForm";
import { Link } from "react-router-dom";
import "./TodoList.css";

// initialTodo never used now that we use local storage.
export default function TodoList({ firstName, userID }) {
  const [todoList, setTodoList] = useState([]);
  const [lists, setLists] = useState([]);

  // when [todoList] array changes, it is turned into a string and saved under the key "todoList"
  useEffect(() => {
    async function load() {
      const allLists = await fetchLists();
      setLists(allLists);

      const allTodos = [];
      for (const list of allLists) {
        const todos = await fetchTodosForList(list);
        allTodos.push(...todos);
      }

      setTodoList(allTodos);
    }

    load();
  }, [userID]);

  async function handleAddList(name) {
    try {
      const created = await createList(name);
      setLists([...lists, created]);
    } catch (error) {
      console.error("could not create list", error);
    }
  }

  async function handleToggle(id) {
    const task = todoList.find((todo) => todo.id === id);
    await setTodoDone(id, !task.done);
    setTodoList(
      todoList.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  async function handleRemove(deleteId) {
    await deleteTodo(deleteId);
    setTodoList(todoList.filter((task) => task.id !== deleteId));
  }

  return (
    <>
      <h1>{firstName}'s To-do lists:</h1>

      {lists.length === 0 ? (
        <p>No todo-lists yet.</p>
      ) : (
        lists.map((list) => {
          const todosForThisList = todoList.filter(
            (task) => task.list === list.id,
          );

          return (
            <section key={list.id}>
              <div className="list-info"> 
              <h2>
                 <Link to={`/lists/${list.id}/${encodeURIComponent(list.get("name"))}`}>{list.get("name")}</Link>
              </h2>
              {todosForThisList.length === 0 ? (
                <h4>Nothing on this list yet!</h4>
              ) : (
                <h4>{todosForThisList.length} things to do!</h4>
              )}
              <button>Delete list</button> {/*This does not work yet. Should give warning if there is still items on list*/}
              </div>
            </section>
          );
        })
      )}
      <NewListForm onAdd={handleAddList} />
    </>
  );
}
