import { SignUp } from '~/types/signup.type'
import { HttpRequest } from '~/ultis'

export const signup = async <T>(username: string, email: string, password: string) => {
  const response = await HttpRequest.post<SignUp>('/auth/signup', { username, email, password })
  if (response.status === 200) return response.data
}
