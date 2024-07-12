import { useMutation } from 'react-query'
import api from '../../../../utils/api'

enum PatientSurgery {
  MORE_THEN_TWO_MONTHS = 'MORE_THEN_TWO_MONTHS',
  UNTIL_TWO_MONTHS = 'UNTIL_TWO_MONTHS',
  NONE = 'NONE',
}

export type Inputs = {
  created_date: string
  name: string
  attendenceNumber: string
  medicines: Array<string>
  age: string
  creatinine: string
  gender: string
  race: string
  urea: string
  diet: string
  surgery: PatientSurgery
  sepsisSign: string
  autoimune: string
  oliguria: string
  diabetes: string
  has: string
  contrastedExams: string
  hereditaryFactor: string
  icc: string
}

export type InputsMapped = {
  created_date: string
  name: string
  attendenceNumber: number
  medicines: Array<string>
  age: number
  creatinine: number
  gender: string
  isBlack: boolean
  urea: number
  diet: string
  surgery: PatientSurgery
  sepsisSign: boolean
  autoimune: boolean
  oliguria: boolean
  diabetes: boolean
  has: boolean
  contrastedExams: boolean
  hereditaryFactor: boolean
  icc: boolean
}

const usePostNewPatient = () => {
  return useMutation(async (newPatient: InputsMapped) => {
    const { data } = await api.post('/patients', newPatient)
    return data
  })
}

export { usePostNewPatient, PatientSurgery }
