import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Portal from "./components/portal/Portal";
import { AuthProvider } from "./contexts/authContext";
import { SearchProvider } from "./contexts/searchContext";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
