import { Routes, Route } from 'react-router-dom'
import { UsersList, CreateUser } from '../pages'
import NotFound from '../../../pages/NotFound'

const ManagerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/usuarios" element={<UsersList />} />
      <Route path="/criar-usuario" element={<CreateUser />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export { ManagerRoutes }
