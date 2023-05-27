import { Role } from './role.type'

export interface Auth {
  roles: Role[]
  accessToken?: string
}
