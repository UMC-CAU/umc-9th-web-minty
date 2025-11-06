import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../components/Sidebar'

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-black">
        <Outlet />
      </main>
    </div>
  )
}
