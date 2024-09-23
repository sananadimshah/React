import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./tempMovieData";
import AppV1 from "./AppV1.js";
// import StarRating from "./Star.js";ss

// function Test() {
//   const [movieRanting, setMovieRanting] = useState();
//   return (
//     <>
//       <StarRating maxRating={10} userRating={setMovieRanting} />
//       <p>Your gave this movie rating {movieRanting} </p>
//     </>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AppV1 />

    {/* <StarRating
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />

    <StarRating color="red" size="30" className="test" />
    <Test /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
