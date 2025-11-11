import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { routes } from './routes'

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <AppRoutes />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
