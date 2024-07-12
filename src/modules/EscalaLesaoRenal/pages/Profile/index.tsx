import { ProfileTemplate } from '../../templates/Profile'
import { StatusTemplateProps } from '../../templates/Status'

const Profile = ({ isLoading, patient }: StatusTemplateProps) => {
  return <ProfileTemplate isLoading={isLoading} patient={patient} />
}

export { Profile }
