import { PatientSurgery, Status } from '../../../../utils/types'

export const rows: Array<{
  slug: string
  label: string
  value: (v: string | Array<string> | number | boolean) => string
}> = [
  {
    slug: 'status',
    label: 'Status',
    value(v: string | Array<string> | number | boolean) {
      if (typeof v !== 'string') return ''
      return Status.get(v) || ''
    },
  },
  {
    slug: 'medicines',
    label: 'Medicamentos',
    value(v: string | Array<string> | number | boolean) {
      if (typeof v !== 'object') return ''
      return v.reduce((previous, current, index) => {
        return previous + (index === 0 ? '' : ', ') + current
      }, '')
    },
  },
  {
    slug: 'age',
    label: 'Idade',
    value(v: string | number | boolean) {
      return `${v} anos`
    },
  },
  {
    slug: 'creatinine',
    label: 'Creatinina',
    value(v: string | number | boolean) {
      return `${v} ml`
    },
  },
  {
    slug: 'etfgCKDEPI',
    label: 'etfgCKDEPI',
    value(v: string | number | boolean) {
      return `${Number(v).toFixed(4)} ml`
    },
  },
  {
    slug: 'urea',
    label: 'Uréia',
    value(v: string | number | boolean) {
      return `${v} ml`
    },
  },
  {
    slug: 'diet',
    label: 'Dieta',
    value(v: string | number | boolean) {
      return v.toString()
    },
  },
  {
    slug: 'surgery',
    label: 'Cirurgia',
    value(v: string | number | boolean) {
      if (typeof v !== 'string') return ''
      return PatientSurgery.get(v) || ''
    },
  },
  {
    slug: 'sepsisSign',
    label: 'Sinal de Sepse',
    value(v: string | number | boolean) {
      if (typeof v !== 'boolean') return ''
      return v ? 'Sim' : 'Não'
    },
  },
  {
    slug: 'oliguria',
    label: 'Oligúria',
    value(v: string | number | boolean) {
      if (typeof v !== 'boolean') return ''
      return v ? 'Sim' : 'Não'
    },
  },
  {
    slug: 'diabetes',
    label: 'Diabetes',
    value(v: string | number | boolean) {
      if (typeof v !== 'boolean') return ''
      return v ? 'Sim' : 'Não'
    },
  },
  {
    slug: 'has',
    label: 'HAS',
    value(v: string | number | boolean) {
      if (typeof v !== 'boolean') return ''
      return v ? 'Sim' : 'Não'
    },
  },
  {
    slug: 'contrastedExams',
    label: 'Exames Contrastados',
    value(v: string | number | boolean) {
      if (typeof v !== 'boolean') return ''
      return v ? 'Sim' : 'Não'
    },
  },
  {
    slug: 'hereditaryFactor',
    label: 'Fator Hereditário',
    value(v: string | number | boolean) {
      if (typeof v !== 'boolean') return ''
      return v ? 'Sim' : 'Não'
    },
  },
  {
    slug: 'icc',
    label: 'ICC',
    value(v: string | number | boolean) {
      if (typeof v !== 'boolean') return ''
      return v ? 'Sim' : 'Não'
    },
  },
  {
    slug: 'autoimune',
    label: 'Doença Autoimune',
    value(v: string | number | boolean) {
      if (typeof v !== 'boolean') return ''
      return v ? 'Sim' : 'Não'
    },
  },
]
