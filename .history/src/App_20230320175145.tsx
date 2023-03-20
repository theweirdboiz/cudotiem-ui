import { PostAddNewPage } from "pages/manage";
import { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import DefaultLayout from "./layouts/DefaultLayout";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <HomePage />
            </HomeLayout>
          }
        ></Route>
        <Route
          path="/manage/add-post"
          element={
            <HomeLayout>
              <PostAddNewPage />
            </HomeLayout>
          }
        ></Route>
        {/* {publicRoutes.map((route, index) => {
          let Layout: any = route.layout || DefaultLayout;
          return (
            <Route
              index
              key={index}
              path={route.path}
              element={<Layout>{route.element}</Layout>}
            >
            </Route>
          );
        })} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
