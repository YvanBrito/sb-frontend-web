import { BrowserRouter as Router } from 'react-router-dom'
import { BaseLayout } from '../components'
import { useAuth } from '../hooks/auth'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes: React.FC = () => {
  const { signed } = useAuth()

  return (
    <Router>
      {signed ? (
        <BaseLayout>
          <AppRoutes />
        </BaseLayout>
      ) : (
        <AuthRoutes />
      )}
    </Router>
  )
}

export { Routes }
