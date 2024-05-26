import ThemeProvider from "./contexts/theme.js";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            {/* {themebtn} */} hi
          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* {/"Card"/} */} hello
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
