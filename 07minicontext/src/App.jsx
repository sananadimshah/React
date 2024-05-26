import react from "react";
import UserContextProvider from "./context/UserContextProvider.jsx";

import "./App.css";
import Login from "./Components/Login.jsx";
import Profile from "./Components/Profile.jsx";

function App() {
  return (
    <UserContextProvider>
      <>
        <h1>Learning React</h1>
        <Login />
        <Profile />
      </>
    </UserContextProvider>
  );
}

export default App;
