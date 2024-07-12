import { useQuery } from 'react-query'
import api from '../../../../utils/api'
import { Patient } from 'src/utils/types'

function useGetAllPatients() {
  return useQuery<Patient[]>('allPatients', async () => {
    const { data } = await api.get('/patients')
    return data
  })
}

export { useGetAllPatients }
