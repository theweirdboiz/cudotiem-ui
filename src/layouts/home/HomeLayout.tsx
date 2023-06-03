import Sidebar from './components/Sidebar'
import PageWrapper from '~/layouts/components/wrapper/PageWrapper'
import Topbar from '../components/topbar/Topbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
const HomeLayout = () => {
  return (
    <>
      <Topbar />
      <PageWrapper>
        <div className='flex justify-between pt-4 gap-x-5'>
          <Sidebar />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  )
}

export default HomeLayout
