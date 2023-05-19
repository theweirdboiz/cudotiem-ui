import useToggleValue from '~/hooks/useToggle'
import Label from '../label/Label'
import Input from '../input/Input'
import IconEyeToggle from '../icon/IconEyeToggle'
import FormGroup from '../form-group/FormGroup'
import Button from '../button/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SignIn } from '~/types/signin.type'
import { signin } from '~/services/authService'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useAth } from '~/contexts'
import { useCookies } from '~/hooks'
import { Auth } from '~/types/auth.type'
import { setCookie } from 'typescript-cookie'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('This field is required'),
  password: yup.string().required('This field is required').min(8, 'Password must be 8 character')
})

const SignInModal = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { value: showPassword, handleToggle } = useToggleValue()
  const { state } = useLocation()
  const { setAuth } = useAth()
  // const { setToken, t } = useCookies()

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<SignIn>({
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const from = state?.from.pathname
  const wathcEmail = watch('email')

  const signInMutation = useMutation({
    mutationFn: async (body: SignIn) => await signin<SignIn>(body.email, body.password),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ['user', wathcEmail],
        exact: true
      })
      navigate(`${from || '/'}`)
      setAuth(data)
      setCookie('cudotiem', data.accessToken)
      toast.success('Login successful!')
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message)
    }
  })

  const onSubmit = (data: SignIn) => {
    signInMutation.mutate(data)
  }

  return (
    <>
      <p className='text-center lg:text-sm text-xs font-normal  lg:mb-8'>
        Dont have an acccount?{' '}
        <Link className='text-primary font-medium underline' to='/sign-up'>
          Sign up
        </Link>
      </p>
      <form action='' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor='email'>Email *</Label>
          <Input
            type='email'
            name='email'
            control={control}
            placeholder='johnnyKlame12@gmail.com'
            error={errors?.email?.message as string}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='password'>Password *</Label>
          <Input
            type={`${showPassword ? 'text' : 'password'}`}
            name='password'
            control={control}
            placeholder='Enter password'
            error={errors?.password?.message as string}
          >
            <IconEyeToggle toggle={showPassword} onClick={handleToggle}></IconEyeToggle>
          </Input>
        </FormGroup>
        <div className='mb-2'>
          <Link to='/forgot-password' className='inline-block text-sm font-medium text-primary'>
            Forgot password
          </Link>
        </div>
        <Button
          style={{
            width: '100%',
            margin: '0 auto'
          }}
          height='h-10'
          type='submit'
          isloading={signInMutation.isLoading}
          disabled={!isValid}
        >
          Submit
        </Button>
      </form>
    </>
  )
}

export default SignInModal
