import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import HomeLayout from "./layouts/HomeLayout";
import { CategoryAddNew, PostAddNew } from "./module";
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
          <Route path="/manage/add-post" element={<PostAddNew />} />
          <Route path="/manage/add-category" element={<CategoryAddNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
