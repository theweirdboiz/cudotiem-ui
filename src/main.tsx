import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import { SearchProvider } from "./contexts/searchContext";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CategoryProvider } from "./contexts/categoryContext";
import { UserProvider } from "./contexts/userContext";
import { PostProvider } from "./contexts/postContext";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <CategoryProvider>
          <PostProvider>
            <QueryClientProvider client={client}>
              <SearchProvider>
                <ToastContainer autoClose={1200}></ToastContainer>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
              </SearchProvider>
            </QueryClientProvider>
          </PostProvider>
        </CategoryProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
