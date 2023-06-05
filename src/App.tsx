import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Role } from './types/role.type'
import VerifyEmailPage from './pages/verify-email/VerifyEmailPage'
import { useChat } from './contexts/chatContext'
import { useAth } from './contexts'
import { Spinner } from './components'
// pages
const UnauthorizedPage = lazy(() => import('./pages/unauthorized/UnauthorizedPage'))
const Eror404Page = lazy(() => import('./pages/404/Eror404Page'))
const SignInPage = lazy(() => import('./pages/sign-in/SignInPage'))
const SignUpPage = lazy(() => import('./pages/sign-up/SignUpPage'))
const ForgotPasswordPage = lazy(() => import('./pages/forgot-password/ForgotPasswordPage'))

const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'))
const PostDetailPage = lazy(() => import('./pages/post-detail/PostDetailPage'))
const PostByCategoryPage = lazy(() => import('./pages/post-by-category/PostByCategoryPage'))
const HomePage = lazy(() => import('./pages/home/HomePage'))

// modules
const UserUpdate = lazy(() => import('./module/user/UserUpdate'))
const UserManage = lazy(() => import('./module/user/UserManage'))
const UserAddNew = lazy(() => import('./module/user/UserAddNew'))
const PostUpdate = lazy(() => import('./module/post/PostUpdate'))
const PostManage = lazy(() => import('./module/post/PostManage'))
const PostAddNew = lazy(() => import('./module/post/PostAddNew'))
// const CategoryUpdate = lazy(() => import('./module/category/CategoryUpdate'))
// const CategoryManage = lazy(() => import('./module/category/CategoryManage'))
// const CategoryAddNew = lazy(() => import('./module/category/CategoryAddNew'))

// layout
const AuthLayout = lazy(() => import('./layouts/auth/AuthLayout'))
const HomeLayout = lazy(() => import('./layouts/home/HomeLayout'))
const DefaultLayout = lazy(() => import('./layouts/default/DefaultLayout'))
const DashboardLayout = lazy(() => import('./layouts/dashboard/DashboardLayout'))

// protected
const RequiredAuth = lazy(() => import('./ultis/RequiredAuth'))

function App() {
  return (
    <Suspense
      fallback={
        <div className='fixed box-center inset-0'>
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/verify-email' element={<VerifyEmailPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        </Route>
        <Route element={<HomeLayout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path='/:slug/:id' element={<PostDetailPage />} />
        </Route>
        <Route path='*' element={<Eror404Page />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} />

        <Route element={<RequiredAuth allowedRoles={[Role.USER]} />}>
          <Route element={<DashboardLayout />}>
            <Route path='/manage/update-post/:id' element={<PostUpdate />} />
            <Route path='/manage/add-post' element={<PostAddNew />} />
          </Route>
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path='/manage/post' element={<PostManage />} />
        </Route>
        <Route element={<RequiredAuth allowedRoles={[Role.ADMIN, Role.MODERATOR, Role.USER]} />}></Route>
      </Routes>
    </Suspense>
  )
}

export default App
