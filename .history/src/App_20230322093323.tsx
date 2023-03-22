import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
        />
        <Route element={<DashboardLayout />}>
          <Route path="/manage/add-post" element={<PostAddNewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
