import { Link } from 'react-router-dom'
import { LoadingSpinner } from '../../../../components'
import { LabeledField } from '../../../../components'
import { PatientSurgery } from '../../../../utils/types'
import { StatusTemplateProps } from '../Status'

const ProfileTemplate = ({ isLoading, patient }: StatusTemplateProps) => {
  if (isLoading) {
    return (
      <div className="w-12 m-auto">
        <LoadingSpinner size={50} />
      </div>
    )
  }
  return (
    <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center gap-10">
      <div className="w-full grid grid-cols-1 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
        <LabeledField label="Nome">{patient?.name}</LabeledField>
        <LabeledField label="Nº de Atendimento">
          {patient?.attendenceNumber}
        </LabeledField>
        <LabeledField label="Sexo">{patient?.gender}</LabeledField>
        <LabeledField label="Negro">
          {patient?.isBlack ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="Idade">
          {patient?.statusData[0].age} anos
        </LabeledField>
        <LabeledField label="Doença AutoImune">
          {patient?.statusData[0].autoimune ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="Exames Contrastados">
          {patient?.statusData[0].contrastedExams ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="Creatinina">
          {patient?.statusData[0].creatinine.toLocaleString('pt-br')}
        </LabeledField>
        <LabeledField label="Diabetes">
          {patient?.statusData[0].diabetes ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="Dieta">{patient?.statusData[0].diet}</LabeledField>
        <LabeledField label="etfgCKDEPI">
          {Number(patient?.statusData[0].etfgCKDEPI.toFixed(2)).toLocaleString(
            'pt-br',
          )}
        </LabeledField>
        <LabeledField label="HAS">
          {patient?.statusData[0].has ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="Fator Hereditário">
          {patient?.statusData[0].hereditaryFactor ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="ICC">
          {patient?.statusData[0].icc ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="Oligúria">
          {patient?.statusData[0].oliguria ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="Sinal de Sepse">
          {patient?.statusData[0].sepsisSign ? 'Sim' : 'Não'}
        </LabeledField>
        <LabeledField label="Cirurgia">
          {PatientSurgery.get(patient?.statusData[0].surgery || 'NONE')}
        </LabeledField>
        <LabeledField label="Uréia">
          {patient?.statusData[0].urea.toLocaleString('pt-br')}
        </LabeledField>
      </div>
      <Link
        to={`/elr/cadastro?attendenceNumber=${patient?.attendenceNumber}&mode=edit`}
        className="bg-[#32747A] px-2 rounded-md"
      >
        <p className="text-white">Editar dados</p>
      </Link>
    </div>
  )
}

export { ProfileTemplate }
