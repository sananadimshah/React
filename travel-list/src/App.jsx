import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  const handleItems = (item) => {
    setItems((items) => [...items, item]);
  };
  const handleDeleteItems = (id) => {
    setItems((item) => item.filter((item) => item.id != id));
  };

  return (
    <div className="app">
      <Logo />
      <Form AddItem={handleItems} />
      <PackingList items={items} DeleteItem={handleDeleteItems} />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return <h1>🏝️ Far Away 🧳</h1>;
};
function Form({ AddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: true, id: Date.now() };

    AddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

//   const [description, setDescription] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   if (!description) return;
//   const newItem = { description, quantity, package: false, id: Date.now() };
//   console.log(newItem);
//   setDescription("");
//   setQuantity(1);
//   return (
//     <form className="add-form" onSubmit={handleSubmit}>
//       <h3>What do you need for your 😍 trip ?</h3>
//       <select
//         value={quantity}
//         onChange={(e) => setQuantity(Number(e.target.value))}
//       >
//         {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
//           <option value={num} key={num}>
//             {num}
//           </option>
//         ))}
//       </select>
//       <input
//         type="text"
//         placeholder="Item..."
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button>ADD</button>
//     </form>
//   );
// };
const PackingList = ({ items, DeleteItem }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} DeleteItem={DeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item, DeleteItem }) => {
  return (
    <li>
      <span style={item.packed ? {} : { textDecoration: "line-through" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => DeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
};
