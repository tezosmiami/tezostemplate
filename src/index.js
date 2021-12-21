import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./UserContext";


ReactDOM.render(
  
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById("root"),
);
