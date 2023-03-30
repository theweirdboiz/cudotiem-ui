import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import HomeLayout from "./layouts/HomeLayout";
import PostDetailLayout from "./layouts/PostDetailLayout";
import {
  CategoryAddNew,
  PostAddNew,
  UserManage,
  UserAddNew,
  UserUpdate,
  PostManage,
  PostUpdate,
} from "./module";
import DashboardLayout from "./layouts/DashboardLayout";
import CategoryManage from "./module/category/CategoryManage";
import CategoryUpdate from "./module/category/CategoryUpdate";
import { PostDetailPage } from "./pages/post";
import { GallaryProvider } from "./contexts";

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
        <Route
          path="/:slug"
          element={
            <PostDetailLayout>
              <PostDetailPage />
            </PostDetailLayout>
          }
        />
        <Route element={<DashboardLayout />}>
          <Route path="/manage/category" element={<CategoryManage />} />
          <Route path="/manage/update-category" element={<CategoryUpdate />} />
          <Route path="/manage/add-category" element={<CategoryAddNew />} />
          <Route path="/manage/user" element={<UserManage />} />
          <Route path="/manage/update-user" element={<UserUpdate />} />
          <Route path="/manage/add-user" element={<UserAddNew />} />

          <Route path="/manage/post" element={<PostManage />} />
          <Route path="/manage/add-post" element={<PostAddNew />} />
          <Route path="/manage/update-post" element={<PostUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
