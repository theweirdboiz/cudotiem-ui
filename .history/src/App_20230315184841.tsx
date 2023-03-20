import { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fragment />}>
          {publicRoutes.map((route, index) => {
            const page = route.element;
            let Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Layout>444</Layout>}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
