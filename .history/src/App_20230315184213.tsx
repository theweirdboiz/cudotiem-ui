import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const page = route.element;
          let Layout = DefaultLayout;
          console.log(route);

          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>123</Layout>}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
