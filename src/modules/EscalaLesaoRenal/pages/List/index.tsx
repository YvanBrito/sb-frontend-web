import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../../../../components'
import { PatientItem } from '../../components'
import { useGetAllPatients } from '../../hooks'
import { useDeletePatient } from '../../hooks/use-delete-patient'

interface IPatient {
  _id: string
  name: string
  attendenceNumber: number
  created_at: string
  statusData: Array<{ status: string; age: number }>
}

const List: React.FC = () => {
  const navigate = useNavigate()
  const { isLoading, data: patients } = useGetAllPatients()
  const { mutateAsync: mutateAsyncDeletePatient } = useDeletePatient()

  const handleClick = (attendenceNumber: number) => {
    navigate(`/elr/${attendenceNumber}/status`)
  }

  const handleDelete = async (id: string) => {
    await mutateAsyncDeletePatient(id)
    navigate(0)
  }

  if (isLoading) {
    return (
      <div className="w-12 m-auto">
        <LoadingSpinner size={50} />
      </div>
    )
  }

  if (patients?.length === 0) {
    return (
      <div className="h-full flex justify-center">
        <h1 className="text-2xl mt-6">Nenhum paciente encontrado</h1>
      </div>
    )
  }

  return (
    <div className="grid gap-2 grid-cols-1 min-[1100px]:grid-cols-2 min-[1430px]:grid-cols-3 min-[1750px]:grid-cols-4">
      {patients?.map(
        ({
          _id,
          name,
          attendenceNumber,
          created_at: createdAt,
          statusData,
        }: IPatient) => (
          <PatientItem
            key={_id}
            id={_id}
            name={name}
            createdDate={new Date(createdAt)}
            age={statusData[0]?.age || 0}
            attendenceNumber={attendenceNumber}
            status={statusData[0]?.status || ''}
            onClick={handleClick}
            onDelete={handleDelete}
          />
        ),
      )}
    </div>
  )
}

export { List }
