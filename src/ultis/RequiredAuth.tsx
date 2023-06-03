import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAth } from '~/contexts'
import { Role } from '~/types/role.type'

type RequeredAuthType = {
  allowedRoles: Role[]
}

const RequiredAuth = ({ allowedRoles }: RequeredAuthType) => {
  const { auth } = useAth()
  const location = useLocation()

  if (!auth) {
    return <Navigate to={'/sign-in'} state={{ from: location }} replace />
  }

  return (
    <>
      {allowedRoles.some((role) => auth.role === role) ? (
        <Outlet />
      ) : (
        <Navigate to={'/unauthorized'} state={{ from: location }} replace />
      )}
    </>
  )
}

export default RequiredAuth
