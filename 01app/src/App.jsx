import { useState } from "react";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  const incValue = () => {
    if (count <= 20) {
      setCount((preverseCounter) => preverseCounter + 1);
    }
  };
  const dcreValue = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <h1>Hello EveryOne</h1>
      <h2>Counter value:{count}</h2>

      <button onClick={incValue}>Add Value {count}</button>
      <br />
      <button onClick={dcreValue}>Remove Value {count}</button>
    </>
  );
}

export default App;
