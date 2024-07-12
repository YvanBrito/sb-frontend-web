import { FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { User, useAuth } from 'src/hooks/auth'
import { EDIT_USER, PermissionsOptions } from 'src/utils/permissions'
import { usePatchPermission } from '../hooks/use-patch-permissions'
import { toast } from 'react-toastify'

export interface PermissionInput {
  [key: string]: boolean
}

interface IPermissionsForm {
  user: User
}

const PermissionsForm: React.FC<IPermissionsForm> = ({
  user,
}: IPermissionsForm) => {
  const { user: userAuth } = useAuth()

  const defaultValues: PermissionInput = {
    CREATE_PATIENT: !!user.permissions.find((p) => p === 'CREATE_PATIENT'),
    DASHBOARD: !!user.permissions.find((p) => p === 'DASHBOARD'),
    DELETE_PATIENT: !!user.permissions.find((p) => p === 'DELETE_PATIENT'),
    DELETE_USER: !!user.permissions.find((p) => p === 'DELETE_USER'),
    EDIT_PATIENT: !!user.permissions.find((p) => p === 'EDIT_PATIENT'),
    EDIT_USER: !!user.permissions.find((p) => p === 'EDIT_USER'),
    MANAGER: !!user.permissions.find((p) => p === 'MANAGER'),
    CREATE_USER: !!user.permissions.find((p) => p === 'CREATE_USER'),
  }
  const { handleSubmit, control } = useForm<PermissionInput>({
    defaultValues,
  })

  const { mutateAsync: mutateAsyncPatchPermission } = usePatchPermission()

  const onSubmit: SubmitHandler<PermissionInput> = async (
    submitData: PermissionInput,
  ) => {
    const permissions: string[] = Object.keys(submitData)
      .map((m) => (submitData[m] ? m : ''))
      .filter((m) => m !== '')
    await toast.promise(
      mutateAsyncPatchPermission({ permissions, userId: user._id }),
      {
        pending: 'Atualizando permissões...',
        success: 'Permissões atualizadas!',
      },
    )
  }
  return (
    <form className="lg:mx-24" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        {PermissionsOptions.map(({ label, permission }) => (
          <Controller
            key={permission}
            name={permission}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    defaultChecked={user.permissions.includes(permission)}
                  />
                }
                label={label}
              />
            )}
          />
        ))}
      </FormGroup>

      <Button
        type="submit"
        variant="contained"
        disabled={!userAuth?.permissions.includes(EDIT_USER)}
      >
        Atualizar
      </Button>
    </form>
  )
}

export { PermissionsForm }
