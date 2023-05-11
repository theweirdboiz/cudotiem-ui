import { ModalAdvanced, SignUpModal } from '~/components'

const SignUpPage = () => {
  return (
    <ModalAdvanced visible={true} heading='Welcome back, mate'>
      <SignUpModal />
    </ModalAdvanced>
  )
}

export default SignUpPage
