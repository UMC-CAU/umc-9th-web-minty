import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { routes } from './routes'

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
