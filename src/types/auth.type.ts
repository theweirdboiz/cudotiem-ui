import { User } from './user.type'

export interface Auth {
  user: Pick<User, 'id' | 'username' | 'email' | 'roles'>
}
