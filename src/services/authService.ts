import { SignUp } from '~/types/signup.type'
import { HttpRequest } from '~/ultis'

export const signup = async <T>(username: string, email: string, password: string) => {
  const response = await HttpRequest.post<T>('/auth/signup', { username, email, password })
  if (response.status === 200) return response.data
}

export const signin = async <T>(email: string, password: string) => {
  const response = await HttpRequest.post<T>('/auth/signin', { usernameOrEmail: email, password })
  if (response.status === 200) return response.data
}
