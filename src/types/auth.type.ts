import { Role } from './role.type'

export interface Auth {
  role: Role
  accessToken: string
}
