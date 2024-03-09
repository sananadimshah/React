import { useState } from "react";
import Card from "./components/Card";

function App() {
  const [count, setCount] = useState(0);
  let name = "mona",
    btn;
  return (
    <>
      <h1 className="bg-green-400 text-black p-4  rounded-xl mb-4">
        Tailwind test
      </h1>
      <Card name="Sana" btn="click me" />
      <Card name="Aayat" btn="visit me" />
    </>
  );
}

export default App;
