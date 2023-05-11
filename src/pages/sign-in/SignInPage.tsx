import { ModalAdvanced, SignInModal } from '~/components'

const SignInPage = () => {
  return (
    <ModalAdvanced visible={true} heading='Welcome back, mate'>
      <SignInModal />
    </ModalAdvanced>
  )
}

export default SignInPage
