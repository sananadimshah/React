import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [newFriend, setNewFriend] = useState(initialFriends);
  const [showFriend, setShowFriend] = useState(false);

  const [seletedFriend, setSeletedFriend] = useState(null);

  const AddNewFriend = (friend) => {
    setNewFriend((friends) => [...friends, friend]);
    showFriend(false);
  };
  const handleClick = () => {
    setShowFriend((open) => !open);
  };
  const handleSelection = (friend) => {
    setSeletedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowFriend(false);
  };

  const hanbleSplitBill = (value) => {
    setNewFriend((friends) =>
      friends.map((friend) =>
        friend.id === seletedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSeletedFriend(null);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          newFriend={newFriend}
          onSelection={handleSelection}
          seletedFriend={seletedFriend}
        />

        {showFriend && <FormAddFriend AddNewFriend={AddNewFriend} />}

        <Button onClick={handleClick}>
          {showFriend == true ? "Close" : "Add Friend"}
        </Button>
      </div>
      {seletedFriend && (
        <FormSplitBill
          seletedFriend={seletedFriend}
          hanbleSplitBill={hanbleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ newFriend, onSelection, seletedFriend }) {
  return (
    <ul>
      {newFriend.map((friend) => (
        <Friend
          friends={friend}
          key={friend.id}
          onSelection={onSelection}
          seletedFriend={seletedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friends, onSelection, seletedFriend }) {
  console.log(friends, seletedFriend);

  const isSelected = seletedFriend?.id === friends.id;
  return (
    <li className={`isSelected ? "selected" : ""`}>
      <img src={friends.image} alt={friends.name} />
      <h3>{friends.name}</h3>

      {friends.balance < 0 && (
        <p className="red">
          You owe {friends.name} {Math.abs(friends.balance)}€
        </p>
      )}
      {friends.balance > 0 && (
        <p className="green">
          {friends.name} owes you {Math.abs(friends.balance)}€
        </p>
      )}
      {friends.balance === 0 && <p>You and {friends.name} are even</p>}

      <Button onClick={() => onSelection(friends)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriend({ AddNewFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    AddNewFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👩🏻‍❤️‍👩🏻Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🎆 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={() => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ seletedFriend, hanbleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setwhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    hanbleSplitBill(whoIsPaying == "user" ? paidByFriend : -paidByUser);
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {seletedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🕴️Your expense</label>

      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑{seletedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setwhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{seletedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
