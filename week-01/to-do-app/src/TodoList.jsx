export default function TodoList({ firstName, personalTodoList }) {

    function handleAdd(event) {
        console.log("Put more stuff on the list")
    }

  return (
    <>
      <h1>Stuff that {firstName} needs to get done:</h1>

      <h2>{personalTodoList.length} things</h2>

      <ul>
        {personalTodoList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button onClick={handleAdd}>Add new item to the list</button>


    </>
  );
}
