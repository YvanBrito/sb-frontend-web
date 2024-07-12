import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Painel } from '../pages/Painel'
import { DashboardRoutes } from '../modules/Dashboard/routes/dashboard.routes'
import { ELRRoutes } from '../modules/EscalaLesaoRenal/routes/elr.routes'
import { ManagerRoutes } from '../modules/Manage/routes/manager.routes'
import { useAuth } from '../hooks/auth'
import { DASHBOARD, MANAGER } from 'src/utils/permissions'

interface ProtectedRouteProps {
  permission: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  permission,
}: ProtectedRouteProps) => {
  const { user } = useAuth()
  if (user?.permissions.find((p) => p === permission)) return <Outlet />
  else return <Navigate to={'/'} replace />
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Painel />} />
      <Route element={<ProtectedRoute permission={DASHBOARD} />}>
        <Route path="dashboard/*" element={<DashboardRoutes />} />
      </Route>
      <Route element={<ProtectedRoute permission={MANAGER} />}>
        <Route path="gerenciar/*" element={<ManagerRoutes />} />
      </Route>
      <Route path="elr/*" element={<ELRRoutes />} />
    </Routes>
  )
}

export default AppRoutes
