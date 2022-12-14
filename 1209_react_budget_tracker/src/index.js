import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const func = (data) => {
  console.log(data);
  console.log("index");
  return data;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App item={{ 1: "123" }} f={func} />);
