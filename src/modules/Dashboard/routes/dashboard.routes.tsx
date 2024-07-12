import { Routes, Route } from 'react-router-dom'
import { MainDash } from '../pages'
import NotFound from '../../../pages/NotFound'

const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDash />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export { DashboardRoutes }
