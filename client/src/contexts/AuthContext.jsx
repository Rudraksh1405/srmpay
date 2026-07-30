import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (account) => {
    setUser(account)
    const { role } = account
    if (role === 'student') navigate('/vendors')
    if (role === 'merchant') navigate('/merchant/dashboard')
    if (role === 'admin') navigate('/admin/dashboard')
  }
  const logout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
