import { useState } from "react";
import './NewTodoForm.css';

export default function NewTodoForm({ onAdd }) {
  const [newTask, setNewTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(newTask);
    setNewTask("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button>Add new item to the list</button>
    </form>
  );
}
