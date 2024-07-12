import { useQuery } from 'react-query'
import api from '../../../../utils/api'
import { Patient } from '../../../../utils/types'

function useGetPatient(patientId: string | null | undefined) {
  return useQuery<Patient>(
    'patient',
    async () => {
      const { data }: { data: Patient } = await api.get(
        `/patients/an/${patientId}`,
      )
      return data
    },
    {
      refetchOnWindowFocus: false,
      onError: (err) => console.log(err),
    },
  )
}

export { useGetPatient }
