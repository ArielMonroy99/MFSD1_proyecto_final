import { ReactElement } from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router'

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth()
  console.log(user)
  return user ? (
    <div>
      <span>hola {user.nombre} </span>
      {children}
    </div>
  ) : (
    <Navigate to="/login" />
  )
}
