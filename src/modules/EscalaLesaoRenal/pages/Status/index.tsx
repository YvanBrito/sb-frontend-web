import { StatusTemplate, StatusTemplateProps } from '../../templates/Status'

const Status = ({ isLoading, patient }: StatusTemplateProps) => {
  return <StatusTemplate isLoading={isLoading} patient={patient} />
}

export { Status }
