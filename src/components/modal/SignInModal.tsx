/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import { signin } from '~/services/authService'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useAth } from '~/contexts'
import { setCookie } from 'typescript-cookie'
import { useEffect, useState } from 'react'
import { SignInMessage } from '~/ultis/message/auth.message'
import { SignInRequest } from '~/types/signin.type'

// const schema = yup.object().shape({
//   password: yup.string().required('This field is required').min(8, 'Password must be 8 character')
// })

const emailLoginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
})

const usernameLoginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
})

const SignInModal = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { value: showPassword, handleToggle } = useToggleValue()
  const { state } = useLocation()
  const { setAuth } = useAth()
  const [optionSignIn, setOptionSignIn] = useState<'email' | 'username'>('username')

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isValid }
  } = useForm<SignInRequest>({
    resolver: yupResolver(optionSignIn === 'email' ? usernameLoginSchema : emailLoginSchema),
    mode: 'all'
  })

  const from = state?.from.pathname
  const wathcEmail = watch('email')
  const wathcUsername = watch('username')

  const signInMutation = useMutation({
    mutationFn: async (body: SignInRequest) =>
      await signin<SignInRequest>((wathcEmail || wathcUsername) as string, body.password),
    onSuccess: (jwtToken: any) => {
      queryClient.invalidateQueries({
        queryKey: ['user', wathcEmail || wathcUsername],
        exact: true
      })
      navigate(`${from || '/'}`)
      const role = jwtToken.roles[0]
      setAuth({ ...jwtToken, role })
      setCookie('cudotiem', JSON.stringify(jwtToken))
      toast.success(SignInMessage.SUCCESS)
    },
    onError: (error: AxiosError) => {
      toast.error(SignInMessage.FAILED)
      navigate(`${from || '/'}`)
    }
  })

  const onSubmit = (data: SignInRequest) => {
    signInMutation.mutate(data)
  }
  const handleToggleOptionSignIn = () => {
    setOptionSignIn(optionSignIn === 'email' ? 'username' : 'email')
  }
  useEffect(() => {
    trigger('email', { shouldFocus: true })
  }, [])
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
          {optionSignIn === 'username' ? (
            <>
              <Label htmlFor='email'>Email *</Label>
              <Input
                type='email'
                name='email'
                control={control}
                placeholder='johnnyKlame12@gmail.com'
                error={errors?.email?.message as string}
              />
            </>
          ) : (
            <>
              <Label htmlFor='username'>Username *</Label>
              <Input
                name='username'
                control={control}
                placeholder='johnnyKlame12'
                error={errors?.username?.message as string}
              />
            </>
          )}
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
        <Button className='h-10' type='submit' loading={signInMutation.isLoading} disabled={!isValid}>
          Submit
        </Button>
        <div className='text-center'>
          <button className='text-primary text-sm text-center cursor-pointer mt-1' onClick={handleToggleOptionSignIn}>
            Sign in with {optionSignIn}
          </button>
        </div>
      </form>
    </>
  )
}

export default SignInModal
