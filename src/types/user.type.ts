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
  fullname?: string
  phoneNumber?: string
  avatar?: string
  status?: Status
  roles?: Role[]
  permission?: Permission[]
  createdAt?: string
}

export interface UserInfor {
  firstName: 'abc'
  lastName: 'xyz'
  phoneNumber: string
  avatar: string
  idAddress: number
}
