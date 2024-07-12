import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { User, useAuth } from 'src/hooks/auth'
import {
  CREATE_PATIENT,
  CREATE_USER,
  DELETE_PATIENT,
  EDIT_PATIENT,
  IPermissionOption,
  IPositionOption,
  PermissionsOptions,
  PositionOptions,
} from 'src/utils/permissions'
import { usePostNewUser } from '../../hooks/use-post-new-patient'
import { useNavigate } from 'react-router-dom'

export interface UserFormData extends Omit<User, '_id' | 'lastLogin'> {
  password: string
  passwordRep: string
  permissions: string[]
}

const CreateUserTemplate = () => {
  const navigate = useNavigate()
  const { user: userAuth } = useAuth()
  const { mutateAsync: mutateAsyncPostUser } = usePostNewUser()
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordRep: '',
      permissions: [CREATE_PATIENT, EDIT_PATIENT, DELETE_PATIENT],
      position: '',
      registrationNumber: '',
    },
  })

  const filterPermissionsByRole = ({ role }: IPermissionOption) =>
    role.includes(userAuth?.role || '')

  const filterPositionsByRole = ({ role }: IPositionOption) =>
    role.includes(userAuth?.role || '')

  const onSubmit: SubmitHandler<UserFormData> = async (
    submitData: UserFormData,
  ) => {
    const {
      name,
      email,
      password,
      position,
      permissions,
      role,
      registrationNumber,
    }: UserFormData = submitData
    try {
      await toast.promise(
        mutateAsyncPostUser({
          name,
          email,
          password,
          position,
          permissions,
          role,
          registrationNumber,
        }),
        {
          pending: 'Criando usuário...',
          success: 'Usuário criado com sucesso!',
        },
      )
      navigate('/gerenciar/usuarios')
    } catch (e: unknown) {
      console.log(e)
    }
  }
  return (
    <div className="w-full">
      <form
        autoComplete="off"
        className="mx-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4 my-8">
          <Controller
            name={'name'}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="name"
                required
                label="Nome"
                variant="outlined"
              />
            )}
          />
          <Controller
            name={'email'}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="email"
                required
                autoComplete="off"
                label="Email"
                variant="outlined"
                type="email"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="password"
                required
                autoComplete="off"
                label="Senha"
                variant="outlined"
                type="password"
              />
            )}
          />
          <div>
            <Controller
              name="passwordRep"
              control={control}
              rules={{
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'As senhas não coincidem'
                  }
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="passwordRep"
                  className="w-full"
                  required
                  label="Repetir senha"
                  variant="outlined"
                  type="password"
                />
              )}
            />
            <p className="text-red-600">
              {errors?.passwordRep && errors.passwordRep.message}
            </p>
          </div>
          <Controller
            name={'registrationNumber'}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="registrationNumber"
                required
                label="Coren"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <FormControl>
                <InputLabel id="position">Posição</InputLabel>
                <Select {...field} required labelId="position" label="Posição">
                  {PositionOptions.filter(filterPositionsByRole).map(
                    ({ label, position }) => (
                      <MenuItem key={position} value={position}>
                        {label}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 my-8">
          <FormGroup>
            {PermissionsOptions.filter(filterPermissionsByRole).map(
              ({ label, permission }) => {
                return (
                  <Controller
                    key={permission}
                    name={'permissions'}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            defaultChecked={
                              permission === CREATE_PATIENT ||
                              permission === EDIT_PATIENT ||
                              permission === DELETE_PATIENT
                            }
                            value={permission}
                            onChange={(event, checked) => {
                              if (checked) {
                                field.onChange([
                                  ...field.value,
                                  event.target.value,
                                ])
                              } else {
                                field.onChange(
                                  field.value.filter(
                                    (value) => value !== event.target.value,
                                  ),
                                )
                              }
                            }}
                          />
                        }
                        label={label}
                      />
                    )}
                  />
                )
              },
            )}
          </FormGroup>
        </div>
        <Button
          type="submit"
          variant="contained"
          disabled={!userAuth?.permissions.includes(CREATE_USER)}
        >
          Criar usuário
        </Button>
      </form>
    </div>
  )
}

export { CreateUserTemplate }
