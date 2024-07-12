import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  IconButton,
  Button,
} from '@mui/material'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { LoadingSpinner } from 'src/components'
import { Fragment, useState } from 'react'
import { useGetAllUsers } from '../../hooks/use-get-all-users'
import { PermissionsForm } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/auth'
import { positionMap } from 'src/utils/permissions'

const columns = [
  'Nome',
  'Email',
  'Número de Registro',
  'Posição',
  'Último acesso',
  '',
]

const UsersListTemplate: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState('')

  const { isLoading, data: users } = useGetAllUsers()

  if (isLoading) {
    return (
      <div className="w-12 m-auto">
        <LoadingSpinner size={50} />
      </div>
    )
  }

  return (
    <div className="md:w-[95%]">
      <div className="mb-3">
        <Button
          variant="contained"
          disabled={!user?.permissions.includes('CREATE_USER')}
          onClick={() => navigate('/gerenciar/criar-usuario')}
        >
          + Criar novo usuário
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns?.map((data, index) => (
                <TableCell key={`${data}-${index}`} align="right">
                  <p className="text-base">{data}</p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {users ? (
            <TableBody>
              {users.map((user) => (
                <Fragment key={user._id}>
                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                      {user.registrationNumber}
                    </TableCell>
                    <TableCell align="right">
                      {positionMap.get(user.position)}
                    </TableCell>
                    <TableCell align="right">
                      {new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                      }).format(new Date(user.lastLogin))}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                          setOpen(open === user._id ? '' : user._id)
                        }}
                      >
                        {open === user._id ? (
                          <VscTriangleUp />
                        ) : (
                          <VscTriangleDown />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={open === user._id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <PermissionsForm key={user._id} user={user} />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}

export { UsersListTemplate }
