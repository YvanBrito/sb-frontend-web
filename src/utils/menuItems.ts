import { DASHBOARD, MANAGER } from './permissions'

export const menuItems = [
  {
    label: 'Painel',
    id: 'panel',
    path: '/',
  },
  {
    label: 'Escala de Lesão Renal',
    id: 'escale',
    children: [
      {
        label: 'Lista de pacientes',
        id: 'search',
        path: '/elr/lista',
      },
      {
        label: 'Cadastrar paciente',
        id: 'create',
        path: '/elr/cadastro',
        permission: DASHBOARD,
      },
    ],
  },
  {
    label: 'Dashboard',
    id: 'dashboard',
    path: 'dashboard',
    permission: DASHBOARD,
  },
  {
    label: 'Gerenciar',
    id: 'manage',
    permission: MANAGER,
    children: [
      {
        label: 'Usuários',
        id: 'users',
        path: '/gerenciar/usuarios',
      },
    ],
  },
]

export const panelItems = [
  {
    label: 'Lista de Pacientes',
    path: 'elr/lista',
    description: 'Acompanhe e analise seus pacientes',
  },
  {
    label: 'Cadastrar Paciente',
    path: 'elr/cadastro',
    description: 'Cadastre um novo paciente',
  },
  {
    label: 'Dashboard',
    path: 'dashboard',
    description: 'Acesse as principais informações sobre seus pacientes',
    permission: DASHBOARD,
  },
]
