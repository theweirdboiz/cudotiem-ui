import { Role } from './role.type'

export interface SignInRequest {
  username?: string
  email?: string
  password: string
}
export interface SignInResponse {
  role: Role[]
  accessToken: string
}
