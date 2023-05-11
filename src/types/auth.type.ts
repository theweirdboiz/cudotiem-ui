import { User } from './user.type'

export interface Auth {
  user: Pick<User, 'username' | 'role' | 'permission'>
  accessToken: string
  refreshToken: string
}
