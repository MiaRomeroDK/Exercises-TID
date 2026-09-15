
import styled from "styled-components";

const TaskText = styled.span`
  padding: 10px;
`;

export default function TodoItem({ task, onToggle, onRemove }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      <TaskText>{task.text}</TaskText>

      <button type="button" onClick={() => onRemove(task.id)}> 
        Delete 
        </button>
    </li>
  );
}
