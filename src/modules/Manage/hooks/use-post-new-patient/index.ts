import { useMutation } from 'react-query'
import api from '../../../../utils/api'

interface NewUser {
  name: string
  email: string
  password: string
  position: string
  permissions: string[]
  role: string
  registrationNumber: string
}

const usePostNewUser = () => {
  return useMutation(async (newUser: NewUser) => {
    const { data } = await api.post('/user', newUser)
    return data
  })
}

export { usePostNewUser }
