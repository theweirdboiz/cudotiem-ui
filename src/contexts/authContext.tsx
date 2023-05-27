import { ReactNode, createContext, useContext, useState } from 'react'
import { getCookie } from 'typescript-cookie'
import { Auth } from '~/types/auth.type'

interface AuthContextType {
  auth: Auth | undefined
  setAuth: React.Dispatch<React.SetStateAction<Auth | undefined>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const jwtToken: Auth = getCookie('cudotiem') && JSON.parse(getCookie('cudotiem') as string)
  const [auth, setAuth] = useState<Auth | undefined>(jwtToken)
  const value = {
    auth,
    setAuth
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAth = () => {
  const context = useContext(AuthContext)
  if (!context) throw Error('useAuth must be used within a AuthProvider')
  return context
}
