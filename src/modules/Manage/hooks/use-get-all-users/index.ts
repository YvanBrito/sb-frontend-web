import { useQuery } from 'react-query'
import api from '../../../../utils/api'
import { User, useAuth } from '../../../../hooks/auth'

function useGetAllUsers() {
  const { user } = useAuth()
  return useQuery<User[]>('allUsers', async () => {
    const { data } = await api.get(
      `/user/${user?.role === 'ADMIN' ? 'all' : 'owned'}`,
    )
    return data
  })
}

export { useGetAllUsers }
