import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Portal from "./components/portal/Portal";
import { SearchProvider } from "./contexts/Search";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchProvider>
      <App />
      {/* <Portal /> */}
    </SearchProvider>
  </React.StrictMode>
);
