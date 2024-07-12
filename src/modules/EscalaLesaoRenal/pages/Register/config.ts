import Joi from 'joi'
import dayjs from 'dayjs'
import { Inputs, PatientSurgery } from '../../hooks'

const decimalRegex = /^\d+(\.\d+)?$/

export const schema = Joi.object({
  created_date: Joi.string().required(),
  name: Joi.string().required().messages({
    'string.empty': '"Nome" não pode ser um campo vazio',
    'any.required': '"Nome" é um campo obrigatório',
  }),
  attendenceNumber: Joi.number().required().messages({
    'number.empty': '"N° de Atendimento" não pode ser um campo vazio',
    'number.base': '"N° de Atendimento" deve ser um número',
  }),
  medicines: Joi.array().items(Joi.string()),
  age: Joi.number().required().messages({
    'number.empty': '"Faixa etária" não pode ser um campo vazio',
    'number.base': '"Faixa etária" deve ser um número',
  }),
  creatinine: Joi.string().regex(decimalRegex).required().messages({
    'string.empty': '"Creatinina" não pode ser um campo vazio',
    'string.pattern.base':
      '"Creatinina" deve ser um número decimal separado por ponto',
  }),
  gender: Joi.string().required(),
  race: Joi.string().required(),
  urea: Joi.string().regex(decimalRegex).required().messages({
    'string.empty': '"Uréia" não pode ser um campo vazio',
    'string.pattern.base':
      '"Uréia" deve ser um número decimal separado por ponto',
  }),
  diet: Joi.string().required(),
  surgery: Joi.string().required(),
  sepsisSign: Joi.string().required(),
  autoimune: Joi.string().required(),
  oliguria: Joi.string().required(),
  diabetes: Joi.string().required(),
  has: Joi.string().required(),
  contrastedExams: Joi.string().required(),
  hereditaryFactor: Joi.string().required(),
  icc: Joi.string().required(),
})

export const defaultValues: Inputs = {
  created_date: dayjs(new Date()).format('YYYY-MM-DD'),
  name: '',
  attendenceNumber: '',
  medicines: [],
  age: '',
  creatinine: '',
  gender: 'Homem',
  race: 'other',
  urea: '',
  diet: 'Branda/Leve',
  surgery: PatientSurgery.NONE,
  sepsisSign: 'sim',
  autoimune: 'sim',
  oliguria: 'sim',
  diabetes: 'sim',
  has: 'sim',
  contrastedExams: 'sim',
  hereditaryFactor: 'sim',
  icc: 'sim',
}
