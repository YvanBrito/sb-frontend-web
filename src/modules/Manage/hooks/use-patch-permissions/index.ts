import { useMutation } from 'react-query'
import api from '../../../../utils/api'

interface PermissionsRequest {
  permissions: string[]
  userId: string
}

const usePatchPermission = () => {
  return useMutation(async ({ permissions, userId }: PermissionsRequest) => {
    const { data } = await api.patch(`/user/${userId}`, { permissions })
    return data
  })
}

export { usePatchPermission }
