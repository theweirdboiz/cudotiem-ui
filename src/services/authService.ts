import { HttpRequest } from '~/ultis'

export const signup = async <T>(username: string, email: string, password: string) => {
  const response = await HttpRequest.post<T>('/auth/signup', { username, email, password })
  if (response.status === 200) return response.data
}

export const signin = async <T>(usernameOrEmail: string, password: string) => {
  const response = await HttpRequest.post<T>('/auth/signin', { usernameOrEmail: usernameOrEmail, password })
  if (response.status === 200) return response.data
}

export const signout = async <T>() => {
  const response = await HttpRequest.post<T>('/auth/signout')
  if (response.status === 200) return response.data
}
