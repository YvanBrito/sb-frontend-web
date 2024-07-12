import { Routes, Route } from 'react-router-dom'
import { List, Register, Details } from '../pages'
import NotFound from '../../../pages/NotFound'

const ELRRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/lista" element={<List />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/:attendenceNumber/*" element={<Details />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export { ELRRoutes }
