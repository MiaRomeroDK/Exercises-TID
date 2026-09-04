import "./App.css";
import TodoList from "./TodoList";

function App() {
  let maxTodoList = [];
  
  let urzulasTodoList = [
    { id: "1", text: "Get rich fast", done: false },
    { id: "2", text: "Party like it's 1999", done: false },
    { id: "3", text: "Buy bananas", done: false },
    { id: "4", text: "Finish these exercises", done: false },
    { id: "5", text: "Pick up kids from school", done: false },
    { id: "6", text: "Make dinner", done: false },
    { id: "7", text: "Sleeeeep!", done: false },
  ];

  return (
    <>
      <TodoList firstName="Urzula" initialTodoList={urzulasTodoList} />
    </>
  );
}

export default App;
