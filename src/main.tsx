import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Application mount element "#root" was not found.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);