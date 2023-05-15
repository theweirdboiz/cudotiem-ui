import { useEffect } from 'react'
import { ModalAdvanced, SignInModal } from '~/components'

const SignInPage = () => {
  useEffect(() => {
    document.title = 'Đăng nhập - Cụ Đồ Tiễm'
  }, [])
  return (
    <ModalAdvanced visible={true} heading='Welcome back, mate'>
      <SignInModal />
    </ModalAdvanced>
  )
}

export default SignInPage
