export const enum Permission {
  CREATE = 'CREATE',
  RETRIVE = 'RETRIVE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

export const enum Role {
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST'
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
  role?: Role
  permission?: Permission[]
  createdAt?: string
}
