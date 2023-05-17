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
    allowedRoles.some((role) => auth?.user.roles?.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to={'/unauthorized'} state={{ from: location }} replace />
    )
  ) : (
    <Navigate to={'/sign-in'} state={{ from: location }} replace />
  )
}

export default RequiredAuth
