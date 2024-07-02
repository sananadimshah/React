import { useState } from "react";
import AddTodo from "./componant/AddTodo.jsx";
import Todos from "../src/componant/Todos.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello world!</h1>
      <AddTodo />
      <Todos />
    </>
  );
}

export default App;
