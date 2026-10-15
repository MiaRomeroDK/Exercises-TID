
export default function TodoItem({ task, onToggle, onRemove }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      <span id="task-text">{task.text}</span>

      <button type="button" onClick={() => onRemove(task.id)}> 
        Delete 
        </button>
    </li>
  );
}
