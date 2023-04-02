import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// pages
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const PostDetailPage = lazy(() => import("./pages/post-detail/PostDetailPage"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
// modules
const UserUpdate = lazy(() => import("./module/user/UserUpdate"));
const UserManage = lazy(() => import("./module/user/UserManage"));
const UserAddNew = lazy(() => import("./module/user/UserAddNew"));
const PostUpdate = lazy(() => import("./module/post/PostUpdate"));
const PostManage = lazy(() => import("./module/post/PostManage"));
const PostAddNew = lazy(() => import("./module/post/PostAddNew"));
const CategoryUpdate = lazy(() => import("./module/category/CategoryUpdate"));
const CategoryManage = lazy(() => import("./module/category/CategoryManage"));
const CategoryAddNew = lazy(() => import("./module/category/CategoryAddNew"));

const HomeLayout = lazy(() => import("./layouts/HomeLayout/HomeLayout"));
const DefaultLayout = lazy(() => import("./layouts/DefaultLayout"));
const DashboardLayout = lazy(
  () => import("./layouts/DashboardLayout/DashboardLayout")
);
function App() {
  return (
    <Suspense>
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
            <DefaultLayout>
              <PostDetailPage />
            </DefaultLayout>
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
        <Route path="/me/profile" element={<ProfilePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
