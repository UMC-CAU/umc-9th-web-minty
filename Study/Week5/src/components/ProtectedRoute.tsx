import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/token'
import { type ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

//토큰 유효성 검증은 API 호출 할떄
function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default ProtectedRoute
