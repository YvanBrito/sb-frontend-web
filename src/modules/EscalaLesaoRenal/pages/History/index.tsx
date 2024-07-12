import { HistoryTemplate } from '../../templates/History'
import { StatusTemplateProps } from '../../templates/Status'

const History = ({ isLoading, patient }: StatusTemplateProps) => {
  return <HistoryTemplate isLoading={isLoading} patient={patient} />
}

export { History }
