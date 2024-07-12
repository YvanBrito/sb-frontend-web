import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { LoadingSpinner } from '../../../../components'
import { StatusTemplateProps } from '../Status'
import { StatusData } from '../../../../utils/types'
import { rows } from './rows'

const HistoryTemplate = ({ isLoading, patient }: StatusTemplateProps) => {
  if (isLoading) {
    return (
      <div className="w-12 m-auto">
        <LoadingSpinner size={50} />
      </div>
    )
  }

  return (
    <div className="md:w-[95%]">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dados</TableCell>
              {patient?.statusData.map((data, index) => (
                <TableCell key={`${data.created_at}-${index}`} align="right">
                  <p className="font-bold text-base">
                    {new Intl.DateTimeFormat('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'medium',
                    }).format(new Date(data.created_at))}
                  </p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.label}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                {patient?.statusData.map((data, index) => (
                  <TableCell
                    key={`${data.created_at}-${index}-${row.label}`}
                    align="right"
                  >
                    {row.value(data[row.slug as keyof StatusData])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export { HistoryTemplate }
