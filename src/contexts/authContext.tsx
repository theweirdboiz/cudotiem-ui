import { ReactNode, createContext, useContext, useState } from 'react'
import { Auth } from '~/types/auth.type'

interface AuthContextType {
  auth: Auth | undefined
  setAuth: React.Dispatch<React.SetStateAction<Auth | undefined>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth>()
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
