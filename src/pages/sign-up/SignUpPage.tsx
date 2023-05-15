import { useEffect } from 'react'
import { ModalAdvanced, SignUpModal } from '~/components'

const SignUpPage = () => {
  useEffect(() => {
    document.title = 'Đăng ký - Cụ Đồ Tiễm'
  }, [])
  return (
    <ModalAdvanced visible={true} heading='Welcome back, mate'>
      <SignUpModal />
    </ModalAdvanced>
  )
}

export default SignUpPage
