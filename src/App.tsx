import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from 'react-query'
import { AuthProvider } from './hooks/auth'
import { queryClient } from './config'
import { Routes } from './routes'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    <ToastContainer />
  </QueryClientProvider>
)

export default App
