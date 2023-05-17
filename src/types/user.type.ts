import { Role } from './role.type'

export const enum Permission {
  CREATE = 'CREATE',
  RETRIVE = 'RETRIVE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export const enum Status {
  'ACTIVED' = 'ACTIVED',
  'BLOCKED' = 'BLOCKED'
}

export interface User {
  id?: number
  username: string
  email: string
  password: string
  avatar?: string
  status?: Status
  roles?: Role[]
  permission?: Permission[]
  createdAt?: string
}
