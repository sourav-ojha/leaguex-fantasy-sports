import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PlayerContextProvider } from "./playerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayerContextProvider>
      <App />
    </PlayerContextProvider>
  </React.StrictMode>
);
