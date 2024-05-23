import React from "react";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const GItHub = () => {
  const data = useLoaderData();
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://api.github.com/users/sananadimshah")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     });
  // }, []);

  return (
    <div className="text-center bg-orange-500 text-white p-4 text-3xl">
      Github profile :{data.html_url}
    </div>
  );
};

const gitLoader = async () => {
  const response = await fetch("https://api.github.com/users/sananadimshah");
  return response.json();
};

export { GItHub, gitLoader };
