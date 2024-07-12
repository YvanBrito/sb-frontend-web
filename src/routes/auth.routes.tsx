import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default AuthRoutes
