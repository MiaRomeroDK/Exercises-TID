import { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const headerStyle = `
  text-align: center;
  color: #bf4f74;
  margin-bottom: 10px;
  `;

const Header = styled.h1`
  ${headerStyle}
`;

const SubHeader = styled.h2`
  ${headerStyle}
  margin-top: 0;
  
`;

const ListSection = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 0;
    text-align: center;
`;

function loadTodoList() {
  const saved = localStorage.getItem("todoList");
  return saved ? JSON.parse(saved) : [];
}

// initialTodo never used now that we use local storage.
export default function TodoList({ firstName }) {
  const [todoList, setTodoList] = useState(loadTodoList);

  // when [todoList] array changes, it is turned into a string and saved under the key "todoList"
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
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
      <Wrapper>
      <Header>Stuff that {firstName} needs to get done:</Header>

      {todoList.length === 0 ? (
        <SubHeader>Nothing to do, lay down on the couch!</SubHeader>
      ) : (
        <>
          <SubHeader>{todoList.length} things to do!</SubHeader>

          <ListSection>
            {todoList.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onRemove={handleRemove}
              />
            ))}
          </ListSection>
        </>
      )}

      <NewTodoForm onAdd={handleAdd} />
      </Wrapper>
    </>
  );
}
