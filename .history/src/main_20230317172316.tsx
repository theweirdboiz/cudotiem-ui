import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Portal from "./components/portal/Portal";
import { SearchProvider } from "./contexts/SearchContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>
);
