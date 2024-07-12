import { FaTrashAlt } from 'react-icons/fa'
import { statusColor } from '../../../../utils/statusColor'
import { Status } from '../../../../utils/types'

interface IPatientItem {
  id: string
  name: string
  createdDate: Date
  status: string
  age: number
  attendenceNumber: number
  onClick: (attendenceNumber: number) => void
  onDelete: (id: string) => void
}

const PatientItem = ({
  id,
  name,
  createdDate,
  status,
  age,
  attendenceNumber,
  onClick,
  onDelete,
}: IPatientItem) => {
  return (
    <div
      onClick={() => onClick(attendenceNumber)}
      className="bg-white w-80 p-2 rounded-md border-l-4 cursor-pointer hover:bg-gray-100 active:bg-gray-300"
      style={{ borderLeftColor: statusColor(status) }}
    >
      <div className="header flex justify-between text-slate-400">
        <div>
          <span className="">{createdDate.toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="flex items-center">
          <span
            className="inline-block w-2 h-2 mr-1 rounded-full"
            style={{ backgroundColor: statusColor(status) }}
          />
          <span className="mr-3">{Status.get(status)}</span>
          <span
            className="hover:text-slate-900"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(id)
            }}
          >
            <FaTrashAlt />
          </span>
        </div>
      </div>
      <div>
        <div className="font-bold text-lg">{name}</div>
        <div>{age} anos</div>
        <div>N° de atendimento: {attendenceNumber}</div>
      </div>
    </div>
  )
}

export { PatientItem }
