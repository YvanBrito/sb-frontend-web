import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../../../../components'
import { statusColor } from '../../../../utils/statusColor'
import { Patient, Status } from '../../../../utils/types'

export interface StatusTemplateProps {
  isLoading: boolean
  patient?: Patient
}

const StatusTemplate = ({ isLoading, patient }: StatusTemplateProps) => {
  if (isLoading) {
    return (
      <div className="w-12 m-auto">
        <LoadingSpinner size={50} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl">
      <h1 className="text-2xl font-bold">{patient?.name}</h1>
      <p
        className="text-2xl font-bold"
        style={{ color: statusColor(patient?.statusData[0].status || 'MILD') }}
      >
        Status atual: {Status.get(patient?.statusData[0].status || 'MILD')}
      </p>
      <ul className="list-disc px-3 md:px-10">
        {patient?.statusData[0].actions.map((action: string) => (
          <li key={action}>{action}</li>
        ))}
      </ul>
      <Link
        to={`/elr/cadastro?attendenceNumber=${patient?.attendenceNumber}&mode=update`}
        className="bg-[#32747A] px-2 rounded-md mt-10"
      >
        <p className="text-white">Atualizar status</p>
      </Link>
    </div>
  )
}

export { StatusTemplate }
