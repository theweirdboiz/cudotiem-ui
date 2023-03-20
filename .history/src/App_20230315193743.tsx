import { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
            let Layout: any = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                index
                key={index}
                path={route.path}
                element={<Layout>{page}</Layout>}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
