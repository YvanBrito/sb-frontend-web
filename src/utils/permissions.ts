export const DASHBOARD = 'DASHBOARD'
export const MANAGER = 'MANAGER'
export const CREATE_PATIENT = 'CREATE_PATIENT'
export const EDIT_PATIENT = 'EDIT_PATIENT'
export const DELETE_PATIENT = 'DELETE_PATIENT'
export const EDIT_USER = 'EDIT_USER'
export const CREATE_USER = 'CREATE_USER'

export interface IPermissionOption {
  label: string
  permission: string
  role: string[]
}

export interface IPositionOption {
  label: string
  position: string
  role: string[]
}

export const positionMap = new Map<string, string>([
  ['DOCTOR', 'Médico(a)'],
  ['NURSE', 'Enfermeiro(a)'],
])

export const PermissionsOptions = [
  {
    label: 'Criar paciente',
    permission: CREATE_PATIENT,
    role: ['OWNER', 'ADMIN'],
  },
  {
    label: 'Editar paciente',
    permission: EDIT_PATIENT,
    role: ['OWNER', 'ADMIN'],
  },
  {
    label: 'Deletar paciente',
    permission: DELETE_PATIENT,
    role: ['OWNER', 'ADMIN'],
  },
  {
    label: 'Criar usuário',
    permission: CREATE_USER,
    role: ['ADMIN'],
  },
  {
    label: 'Acessar Dashboard',
    permission: DASHBOARD,
    role: ['ADMIN'],
  },
  {
    label: 'Editar usuário',
    permission: EDIT_USER,
    role: ['ADMIN'],
  },
  {
    label: 'Acessar Gerenciamento',
    permission: MANAGER,
    role: ['ADMIN'],
  },
]

export const PositionOptions = [
  {
    label: 'Médico(a)',
    position: 'DOCTOR',
    role: ['OWNER', 'ADMIN'],
  },
  {
    label: 'Enfermeiro(a)',
    position: 'NURSE',
    role: ['OWNER', 'ADMIN'],
  },
]
