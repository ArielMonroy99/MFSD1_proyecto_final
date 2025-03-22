import { ReactElement } from 'react'
import { Navigate } from 'react-router'
import { User } from '../../types/types'

type ProtectedRouteProps = {
  children: ReactElement
  user: User | undefined
}

export const ProtectedRoute = ({ children, user }: ProtectedRouteProps) => {
  return user ? <div>{children}</div> : <Navigate to="/login" />
}
