import "./App.css";
import TodoList from "./TodoList";

function App() {
  let maxTodoList = [
    "Finish these exercises",
    "Pick up kids from school",
    "Make dinner",
    "Sleeeeep!",
  ];
  let urzulasTodoList = [
    "Get rich fast",
    "Party like it's 1999",
    "Buy bananas",
  ];
  return (
    <>
      <TodoList firstName="Max" personalTodoList={maxTodoList} />
      <TodoList firstName="Urzula" personalTodoList={urzulasTodoList} />
    </>
  );
}

export default App;
