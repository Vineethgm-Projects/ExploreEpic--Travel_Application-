import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Home from "../src/Pages/Home";
import Login from "./components/Login";
// In your index.js or App.js
// import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container">
    <Home />
  </div>
);
