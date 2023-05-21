import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useToggle } from '~/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { IconEyeToggle } from '~/components/icon'
import { FormGroup, Input, Label, Button } from '~/components'
import { signup } from '~/services/authService'
import { SignUp } from '~/types/signup.type'
import { AxiosError } from 'axios'

const schema = yup.object().shape({
  username: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email format').required('This field is required'),
  password: yup.string().required('This field is required').min(8, 'Password must be 8 character')
})
const SignUpModal = () => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm<SignUp>({
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const watchUsername = watch('username')

  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const signUpMutation = useMutation({
    mutationFn: async (body: SignUp) => await signup<SignUp>(body.username, body.email, body.password),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: ['user', watchUsername],
        exact: true
      })
      navigate('/verify-email', { state: { message: data.message } })
    },
    onError: (error: AxiosError) => {
      toast.error(error?.message)
    }
  })

  const onSubmit = (data: SignUp) => {
    signUpMutation.mutate(data)
  }

  const { value: showPassword, handleToggle } = useToggle()

  return (
    <>
      <p className='text-center lg:text-sm text-xs font-normal  lg:mb-8'>
        Already have an acccount?{' '}
        <Link className='text-primary font-medium underline' to='/sign-in'>
          Sign in
        </Link>
      </p>

      <form action='' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor='username'>Username *</Label>
          <Input
            name='username'
            control={control}
            placeholder='johnny klame'
            error={errors?.username?.message as string}
          ></Input>
        </FormGroup>
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

        <Button
          style={{
            width: '100%',
            margin: '10px auto'
          }}
          height='h-10'
          type='submit'
          isloading={signUpMutation.isLoading}
          disabled={!isValid}
        >
          Submit
        </Button>
      </form>
    </>
  )
}

export default SignUpModal
