import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchProvider } from "./contexts/Search";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchProvider>
      <CssBaseline />
      <App />
    </SearchProvider>
  </React.StrictMode>
);
