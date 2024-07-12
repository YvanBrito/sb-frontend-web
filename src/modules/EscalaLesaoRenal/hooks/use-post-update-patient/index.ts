import { useMutation } from 'react-query'
import api from '../../../../utils/api'
import { InputsMapped } from '../use-post-new-patient'

const usePostUpdatePatient = (patientId: number) => {
  return useMutation(async (newPatient: InputsMapped) => {
    const { data } = await api.post(`/patients/${patientId}/status`, newPatient)
    return data
  })
}

export { usePostUpdatePatient }
