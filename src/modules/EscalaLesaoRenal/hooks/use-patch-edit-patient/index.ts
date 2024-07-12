import { useMutation } from 'react-query'
import api from '../../../../utils/api'
import { InputsMapped } from '../use-post-new-patient'

const usePatchEditPatient = (patientId: number) => {
  return useMutation(async (newPatient: InputsMapped) => {
    const { data } = await api.patch(`/patients/${patientId}`, newPatient)
    return data
  })
}

export { usePatchEditPatient }
