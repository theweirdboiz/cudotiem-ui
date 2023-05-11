import { ReactNode } from 'react'
import PageWrapper from '../components/wrapper/PageWrapper'
import { Outlet } from 'react-router-dom'

// type Props = {
//   children: ReactNode
// }

const AuthLayout = () => {
  // const { children } = props
  return (
    <PageWrapper>
      <div className='flex items-center justify-center'>
        {/* {children} */}
        <Outlet />
      </div>
    </PageWrapper>
  )
}

export default AuthLayout
