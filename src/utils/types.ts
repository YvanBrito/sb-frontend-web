export interface Patient {
  _id: string
  userId: string
  name: string
  attendenceNumber: number
  gender: string
  isBlack: boolean
  statusData: Array<StatusData>
  created_at: string
}

export interface StatusData {
  _id: string
  created_at: string
  status: string
  medicines: Array<string>
  age: number
  creatinine: number
  etfgCKDEPI: number
  urea: number
  diet: string
  surgery: string
  sepsisSign: boolean
  oliguria: boolean
  diabetes: boolean
  has: boolean
  contrastedExams: boolean
  hereditaryFactor: boolean
  icc: boolean
  patientId: string
  actions: Array<string>
  autoimune: boolean
  created_date: string
}

export const Status = new Map<string, string>([
  ['MILD', 'Leve'],
  ['MODERATE', 'Moderado'],
  ['HIGH', 'Alto'],
])

export const PatientSurgery = new Map<string, string>([
  ['MORE_THEN_TWO_MONTHS', 'Mais do que dois meses'],
  ['UNTIL_TWO_MONTHS', 'Até dois meses'],
  ['NONE', 'Nenhum mês'],
])
