import jwtDecode from 'jwt-decode'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import { User } from '~/types/user.type'
import { HttpRequest } from '~/ultis'

export type UserRegisterFormType = Pick<User, 'username' | 'email' | 'password'>
export type UserLoginFormType = Pick<User, 'email' | 'password'>

type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type DecodedToken = {
  id: number
  iat: number
  exp: number
}

export const register = async (username: string, email: string, password: string) => {
  const response = await HttpRequest.post<UserRegisterFormType>('/signup', {
    username,
    email,
    password
  })
  return response.data
}
export const login = async (email: string, password: string) => {
  const response = await HttpRequest.post<LoginResponse>('/signin', {
    email,
    password
  })
  const { accessToken, refreshToken } = response.data
  if (accessToken) {
    setCookie('accessToken', accessToken, { expires: 7 })
  }

  return jwtDecode(accessToken) as DecodedToken
}
export const logout = () => removeCookie('accessToken')

export const getCurrentUser = (): DecodedToken | null => {
  const token = getCookie('accessToken')
  if (token) {
    return jwtDecode(token)
  }
  return null
}
