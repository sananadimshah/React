import { useState } from "react";
import Card from "./components/Card";

function App() {
  const [count, setCount] = useState(0);
  let name = "mona";
  return (
    <>
      <h1 className="bg-green-400 text-black p-4  rounded-xl mb-4">
        Tailwind test
      </h1>
      <Card name="Sana" />
      <Card name="Aayat" />
    </>
  );
}

export default App;
