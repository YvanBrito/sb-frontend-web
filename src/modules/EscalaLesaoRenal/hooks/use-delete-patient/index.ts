import { useMutation } from 'react-query'
import api from '../../../../utils/api'

function useDeletePatient() {
  return useMutation(async (patientId: string | null | undefined) => {
    const { data } = await api.delete(`/patients/${patientId}`)
    return data
  })
}

export { useDeletePatient }
