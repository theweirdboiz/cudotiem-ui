import { Role } from './role.type'

export interface Auth {
  id: number
  username: string
  email: string
  roles: Role[]
}
