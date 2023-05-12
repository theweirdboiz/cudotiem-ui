import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '~/components'

const VerifyEmailPage = () => {
  const location = useLocation()

  const message = location.state && location.state.mesage

  return !message ? (
    <Navigate to={'/error'} replace></Navigate>
  ) : (
    <div className='p-3 bg-white rounded-md shadow-lg my-5  text-center max-w-[500px]'>
      <div dangerouslySetInnerHTML={{ __html: message }}></div>
      <Button type='button' to='/'>
        Trở về trang đăng nhập
      </Button>
    </div>
  )
}

export default VerifyEmailPage
