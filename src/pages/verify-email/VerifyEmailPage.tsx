import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '~/components'

const VerifyEmailPage = () => {
  const location = useLocation()

  const message = location?.state.message

  return !message ? (
    <Navigate to={'/error'} replace></Navigate>
  ) : (
    <div className='p-3 bg-white rounded-md shadow-lg  text-center max-w-[500px]'>
      <div className='my-5' dangerouslySetInnerHTML={{ __html: message }}></div>
      <Button type='button' to='/sign-in'>
        Trở về trang đăng nhập
      </Button>
    </div>
  )
}

export default VerifyEmailPage
