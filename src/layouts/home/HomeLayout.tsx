import { ReactNode } from 'react'
import Sidebar from './components/Sidebar'
import PageWrapper from '~/layouts/components/wrapper/PageWrapper'
import Topbar from '../components/topbar/Topbar'
type Props = {
  children?: ReactNode
}
const HomeLayout = (props: Props) => {
  return (
    <>
      <Topbar />
      <PageWrapper>
        <div className='flex justify-between pt-4 gap-x-5'>
          <Sidebar />
          <div className='flex-1'>{props.children}</div>
        </div>
      </PageWrapper>
    </>
  )
}

export default HomeLayout
