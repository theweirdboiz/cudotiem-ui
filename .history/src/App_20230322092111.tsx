import { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/home";
import HomeLayout from "./layouts/HomeLayout";
import { PostAddNewPage } from "./pages/manage";
import DashboardLayout from "./layouts/DashboardLayout";

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
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/manage/add-post" element={<PostAddNewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
