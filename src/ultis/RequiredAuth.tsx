import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAth } from '~/contexts'
import { Role } from '~/types/role.type'

type RequeredAuthType = {
  allowedRoles: Role[]
}

const RequiredAuth = ({ allowedRoles }: RequeredAuthType) => {
  const { auth } = useAth()
  const location = useLocation()
  return auth?.user ? (
    allowedRoles.some((role) => role === auth?.user.role) ? (
      <Outlet />
    ) : (
      <Navigate to={'*'} state={{ from: location }} replace />
    )
  ) : (
    <Navigate to={'/sign-in'} state={{ from: location }} replace />
  )
}

export default RequiredAuth
