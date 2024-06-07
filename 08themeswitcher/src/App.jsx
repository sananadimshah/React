import { ThemeProvider } from "./contexts/theme.js";
import "./App.css";
import { useState, useEffect } from "react";
import ThemeBtn from "./components/ThemeBtn.jsx";
import Card from "./components/Card.jsx";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const LightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };
  //actualTheme change

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, LightTheme, darkTheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
