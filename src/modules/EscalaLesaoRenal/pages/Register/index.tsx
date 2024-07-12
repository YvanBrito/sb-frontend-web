import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { joiResolver } from '@hookform/resolvers/joi'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import {
  MenuItem,
  Select,
  Autocomplete,
  InputLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material'

import { toast } from 'react-toastify'
import medicines from './med'
import {
  Inputs,
  InputsMapped,
  PatientSurgery,
  useGetPatient,
  usePatchEditPatient,
  usePostNewPatient,
  usePostUpdatePatient,
} from '../../hooks'
import { defaultValues, schema } from './config'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../../../../components'
import { calcEgrf } from '../../../../utils/calcEgrf'

dayjs.extend(utc)

const Register: React.FC = () => {
  const [searchParams] = useSearchParams()
  const attendenceNumber = searchParams.get('attendenceNumber')
  const mode = searchParams.get('mode')

  const [showCkdInfo, setShowCkdInfo] = useState<boolean>()
  const [showCreatinineInfo, setShowCreatinineInfo] = useState<boolean>()
  const [showUreaInfo, setShowUreaInfo] = useState<boolean>()
  const [showSepseInfo, setShowSepseInfo] = useState<boolean>()
  const [showOliguriaInfo, setShowOliguriaInfo] = useState<boolean>()
  const [showSurgeryInfo, setShowSurgeryInfo] = useState<boolean>()
  const [showContrastedExamsInfo, setShowContrastedExamsInfo] =
    useState<boolean>()
  const [egrf, setEgfr] = useState<number>(0)

  const navigate = useNavigate()

  const { isLoading: isLoadingGetPatient, data: patient } =
    useGetPatient(attendenceNumber)

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Inputs>({
    defaultValues,
    resolver: joiResolver(schema),
  })

  const { mutateAsync: mutateAsyncNewPatient, isLoading: isLoadingNewPatient } =
    usePostNewPatient()
  const {
    mutateAsync: mutateAsyncEditPatient,
    isLoading: isLoadingEditPatient,
  } = usePatchEditPatient(Number(attendenceNumber))
  const {
    mutateAsync: mutateAsyncUpdatePatient,
    isLoading: isLoadingUpdatePatient,
  } = usePostUpdatePatient(Number(attendenceNumber))

  const onSubmit: SubmitHandler<Inputs> = async (submitData) => {
    const requestData: InputsMapped = {
      ...submitData,
      created_date: dayjs(submitData.created_date).utc().format(),
      attendenceNumber: +submitData.attendenceNumber,
      age: +submitData.age,
      urea: +submitData.urea,
      creatinine: +submitData.creatinine,
      isBlack: submitData.race === 'black',
      sepsisSign: submitData.sepsisSign === 'sim',
      autoimune: submitData.autoimune === 'sim',
      oliguria: submitData.oliguria === 'sim',
      diabetes: submitData.diabetes === 'sim',
      has: submitData.has === 'sim',
      contrastedExams: submitData.contrastedExams === 'sim',
      hereditaryFactor: submitData.hereditaryFactor === 'sim',
      icc: submitData.icc === 'sim',
    }
    try {
      if (mode === 'edit') {
        await toast.promise(mutateAsyncEditPatient(requestData), {
          pending: 'Editando paciente...',
          success: 'Paciente editado com sucesso!',
        })
      } else if (mode === 'update') {
        await toast.promise(mutateAsyncUpdatePatient(requestData), {
          pending: 'Atualizando paciente...',
          success: 'Paciente atualizado com sucesso!',
        })
      } else {
        await toast.promise(mutateAsyncNewPatient(requestData), {
          pending: 'Cadastrando paciente...',
          success: 'Paciente cadastrado com sucesso!',
        })
      }
      navigate('/elr/lista')
    } catch (error) {
      console.log(error)
    }
  }

  const onInvalid = (errors: unknown) => {
    console.log('errors', errors)
  }

  const updateEgrf = () => {
    setEgfr(
      calcEgrf({
        isBlack: getValues('race') === 'black',
        gender: getValues('gender'),
        creatinine: Number(getValues('creatinine')),
        age: Number(getValues('age')),
      }),
    )
  }

  useEffect(() => {
    reset(defaultValues)
  }, [attendenceNumber, mode, reset])

  useEffect(() => {
    if (patient) {
      reset({
        age: patient.statusData[0].age.toString(),
        attendenceNumber: patient.attendenceNumber.toString(),
        autoimune: patient.statusData[0].autoimune ? 'sim' : 'nao',
        contrastedExams: patient.statusData[0].contrastedExams ? 'sim' : 'nao',
        created_date: patient.created_at,
        creatinine: patient.statusData[0].creatinine.toString(),
        diabetes: patient.statusData[0].diabetes ? 'sim' : 'nao',
        diet: patient.statusData[0].diet,
        gender: patient.gender,
        has: patient.statusData[0].has ? 'sim' : 'nao',
        hereditaryFactor: patient.statusData[0].hereditaryFactor
          ? 'sim'
          : 'nao',
        icc: patient.statusData[0].icc ? 'sim' : 'nao',
        medicines: patient.statusData[0].medicines || [],
        name: patient.name,
        oliguria: patient.statusData[0].oliguria ? 'sim' : 'nao',
        race: patient.isBlack ? 'black' : 'other',
        sepsisSign: patient.statusData[0].sepsisSign ? 'sim' : 'nao',
        surgery:
          PatientSurgery[
            patient.statusData[0].surgery as keyof typeof PatientSurgery
          ],
        urea: patient.statusData[0].urea.toString(),
      })
    }
  }, [patient, reset])

  if (isLoadingGetPatient) {
    return (
      <div className="w-12 m-auto">
        <LoadingSpinner size={50} />
      </div>
    )
  }

  return (
    <form className="lg:mx-24" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="mb-10 grid grid-cols-1 gap-6 min-[1180px]:grid-cols-2 min-[1430px]:grid-cols-3">
        <Controller
          name="created_date"
          control={control}
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                disabled={!!attendenceNumber}
                label="Data do Atendimento"
                format="DD/MM/YYYY"
                value={dayjs(value)}
                onChange={(event) => {
                  onChange(event?.format('YYYY-MM-DD') || '')
                }}
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={!!attendenceNumber}
              label="Nome"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="attendenceNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled={!!attendenceNumber}
              label="N° de Atendimento"
              error={!!errors.attendenceNumber}
              helperText={errors.attendenceNumber?.message}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Controller
          name="medicines"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              multiple
              id="tags-standard"
              options={medicines}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              value={value.map((v) => ({
                name: v,
              }))}
              getOptionLabel={(option) => option.name}
              onChange={(_event, newValue) => {
                onChange(newValue.map(({ name }) => name))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Medicamentos"
                  error={!!errors.medicines}
                  helperText={errors.medicines?.message}
                />
              )}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 border rounded-lg px-2 py-1 my-6 border-[#0000008f] mt-10">
        <div className="flex gap-2 items-center justify-start mx-2 my-3">
          <span>CKD-EPI</span>{' '}
          <span>
            <AiOutlineQuestionCircle
              size={25}
              className="cursor-pointer"
              onClick={() => setShowCkdInfo(true)}
            />
            {showCkdInfo && (
              <div
                onClick={() => setShowCkdInfo(false)}
                className="bg-[#0000005b] z-[11] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
              >
                <div className="bg-white p-5 rounded-lg w-96 flex flex-col justify-center items-center">
                  <h1 className="text-xl font-bold mb-2">CKD-EPI</h1>
                  <div>
                    <p>&#8805; 90: Normal ou alto</p>
                    <p>60-89: Diminuição ligeira</p>
                    <p>45-59: Diminuição moderada</p>
                    <p>30-44: Diminuição pouco severa</p>
                    <p>15-29: Diminuição grave</p>
                    <p>&lt;15: Falência renal</p>
                  </div>
                </div>
              </div>
            )}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 min-[1180px]:grid-cols-2">
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(event) => {
                  field.onChange(event)
                  updateEgrf()
                }}
                label="Faixa etária"
                error={!!errors.age}
                helperText={errors.age?.message}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            )}
          />
          <div className="flex items-center gap-2">
            <Controller
              name="creatinine"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    updateEgrf()
                  }}
                  className="w-11/12"
                  label="Creatinina (mg/dL)"
                  error={!!errors.creatinine}
                  helperText={errors.creatinine?.message}
                />
              )}
            />
            <span>
              <AiOutlineQuestionCircle
                size={25}
                className="cursor-pointer"
                onClick={() => setShowCreatinineInfo(true)}
              />
              {showCreatinineInfo && (
                <div
                  onClick={() => setShowCreatinineInfo(false)}
                  className="bg-[#0000005b] z-[11] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
                >
                  <div className="bg-white p-5 rounded-lg w-96 flex flex-col justify-center items-center">
                    <h1 className="text-xl font-bold mb-2">Creatinina</h1>
                    <div>
                      <p>Mulheres: entre 0,5mg/dL a 1,1mg/dL</p>
                      <p>Homens: entre 0,6mg/dL a 1,2mg/dL</p>
                      <p>Se não possuir exame: 1mg/dL</p>
                    </div>
                  </div>
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 min-[1180px]:grid-cols-2">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel id="gender-group-label">Sexo</FormLabel>
                <RadioGroup
                  aria-labelledby="gender-group-label"
                  value={field.value ?? ''}
                  name="gender-group"
                  onChange={(event) => {
                    field.onChange(event)
                    updateEgrf()
                  }}
                >
                  <FormControlLabel
                    value="Homem"
                    control={<Radio />}
                    label="Homem"
                  />
                  <FormControlLabel
                    value="Mulher"
                    control={<Radio />}
                    label="Mulher"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />

          <Controller
            name="race"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel id="race-group-label">Raça</FormLabel>
                <RadioGroup
                  aria-labelledby="race-group-label"
                  value={field.value ?? ''}
                  name="race-group"
                  onChange={(event) => {
                    field.onChange(event)
                    updateEgrf()
                  }}
                >
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Outros"
                  />
                  <FormControlLabel
                    value="black"
                    control={<Radio />}
                    label="Negro"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="m-auto py-5">
          <span className="block text-center text-3xl font-bold">
            {Math.round((egrf + Number.EPSILON) * 100) / 100}
          </span>
          <span className="block text-center text-xl">ml/min/1.73 m2</span>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 min-[1180px]:grid-cols-2 min-[1430px]:grid-cols-3">
        <div className="flex items-center gap-2">
          <Controller
            name="urea"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-11/12"
                label="Ureia (mg/dL)"
                error={!!errors.urea}
                helperText={errors.urea?.message}
              />
            )}
          />
          <span>
            <AiOutlineQuestionCircle
              size={25}
              className="cursor-pointer"
              onClick={() => setShowUreaInfo(true)}
            />
            {showUreaInfo && (
              <div
                onClick={() => setShowUreaInfo(false)}
                className="bg-[#0000005b] z-[11] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
              >
                <div className="bg-white p-5 rounded-lg w-96 flex flex-col justify-center items-center">
                  <h1 className="text-xl font-bold mb-2">Uréia</h1>
                  <div>
                    <p>Entre 13mg/dL e 43mg/dL</p>
                    <p>Se não possuir exame: 13mg/dL</p>
                  </div>
                </div>
              </div>
            )}
          </span>
        </div>
        <Controller
          name="diet"
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel id="diet-label">Dieta</InputLabel>
              <Select
                {...field}
                label="Dieta"
                labelId="diet-label"
                id="diet-select"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
              >
                <MenuItem value="Branda/Leve">Branda/Leve</MenuItem>
                <MenuItem value="Pastosa">Pastosa</MenuItem>
                <MenuItem value="Hiperproteica">Hiperproteica</MenuItem>
                <MenuItem value="Geral">Geral</MenuItem>
                <MenuItem value="Irrestrita">Irrestrita</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </div>

      <div className="mb-10 grid grid-cols-1 gap-10 min-[1180px]:grid-cols-2 min-[1430px]:grid-cols-3">
        <div className="flex gap-2">
          <Controller
            name="surgery"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel className="flex gap-4" id="surgery-group-label">
                  <span>Cirurgia</span>
                  <AiOutlineQuestionCircle
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setShowSurgeryInfo(true)}
                  />
                </FormLabel>
                <RadioGroup
                  aria-labelledby="surgery-group-label"
                  value={field.value ?? ''}
                  name="surgery-group"
                  onChange={(event) => {
                    field.onChange(event)
                  }}
                >
                  <FormControlLabel
                    value={PatientSurgery.NONE}
                    control={<Radio />}
                    label="Nenhuma"
                  />
                  <FormControlLabel
                    value={PatientSurgery.UNTIL_TWO_MONTHS}
                    control={<Radio />}
                    label="Até 2 meses"
                  />
                  <FormControlLabel
                    value={PatientSurgery.MORE_THEN_TWO_MONTHS}
                    control={<Radio />}
                    label="Mais do que 2 meses"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
          {showSurgeryInfo && (
            <div
              onClick={() => setShowSurgeryInfo(false)}
              className="bg-[#0000005b] z-[11] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
            >
              <div className="bg-white p-5 rounded-lg w-96 flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold mb-2">Cirurgia</h1>
                <span>Considerar ato cirúrgico de qualquer porte</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Controller
            name="sepsisSign"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel id="sepsisSign-group-label">
                  Sinal de Sepse
                </FormLabel>
                <RadioGroup
                  aria-labelledby="sepsisSign-group-label"
                  value={field.value ?? ''}
                  name="sepsisSign-group"
                  onChange={(event) => {
                    field.onChange(event)
                  }}
                >
                  <FormControlLabel
                    value="sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="nao"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
          <span>
            <AiOutlineQuestionCircle
              size={25}
              className="cursor-pointer"
              onClick={() => setShowSepseInfo(true)}
            />
            {showSepseInfo && (
              <div
                onClick={() => setShowSepseInfo(false)}
                className="bg-[#0000005b] z-[11] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
              >
                <div className="bg-white p-5 rounded-lg w-96 flex flex-col justify-center items-center">
                  <h1 className="text-xl font-bold mb-2">Sinal de Sepse</h1>
                  <div>
                    <p>FC &gt; 120bpm</p>
                    <p>TEMP. &lt; 35º ou &gt; 38º</p>
                    <p> FR &gt; 22 ipm</p>
                    <p>PAS &lt; 100 mmHg</p>
                    <p>Alteração do nível de consciência</p>
                  </div>
                </div>
              </div>
            )}
          </span>
        </div>

        <Controller
          name="autoimune"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel id="autoimune-group-label">
                Presença de doença autoimune
              </FormLabel>
              <RadioGroup
                aria-labelledby="autoimune-group-label"
                value={field.value ?? ''}
                name="autoimune-group"
                onChange={(event) => {
                  field.onChange(event)
                }}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          )}
        />

        <div className="flex gap-2">
          <Controller
            name="oliguria"
            control={control}
            render={({ field }) => (
              <FormControl>
                <FormLabel id="oliguria-group-label">Oligúria</FormLabel>
                <RadioGroup
                  aria-labelledby="oliguria-group-label"
                  value={field.value ?? ''}
                  name="oliguria-group"
                  onChange={(event) => {
                    field.onChange(event)
                  }}
                >
                  <FormControlLabel
                    value="sim"
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value="nao"
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
          <span>
            <AiOutlineQuestionCircle
              size={25}
              className="cursor-pointer"
              onClick={() => setShowOliguriaInfo(true)}
            />
            {showOliguriaInfo && (
              <div
                onClick={() => setShowOliguriaInfo(false)}
                className="bg-[#0000005b] z-[11] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
              >
                <div className="bg-white p-5 rounded-lg w-96 flex flex-col justify-center items-center">
                  <h1 className="text-xl font-bold mb-2">Oligúria</h1>
                  <div>
                    <p>Redução do volume em casa</p>
                    <p>Redução do volume internado(&lt;400ml/24hrs)</p>
                  </div>
                </div>
              </div>
            )}
          </span>
        </div>

        <Controller
          name="diabetes"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel id="diabetes-group-label">Diabetes</FormLabel>
              <RadioGroup
                aria-labelledby="diabetes-group-label"
                value={field.value ?? ''}
                name="diabetes-group"
                onChange={(event) => {
                  field.onChange(event)
                }}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          )}
        />

        <Controller
          name="has"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel id="has-group-label">HAS ou Hipotensão</FormLabel>
              <RadioGroup
                aria-labelledby="has-group-label"
                value={field.value ?? ''}
                name="has-group"
                onChange={(event) => {
                  field.onChange(event)
                }}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          )}
        />

        <Controller
          name="contrastedExams"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel className="flex gap-4" id="surgery-group-label">
                <span>Exames contrastados</span>
                <AiOutlineQuestionCircle
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setShowContrastedExamsInfo(true)}
                />
              </FormLabel>
              <RadioGroup
                aria-labelledby="contrastedExams-group-label"
                value={field.value ?? ''}
                name="contrastedExams-group"
                onChange={(event) => {
                  field.onChange(event)
                }}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          )}
        />
        {showContrastedExamsInfo && (
          <div
            onClick={() => setShowContrastedExamsInfo(false)}
            className="bg-[#0000005b] z-[11] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
          >
            <div className="bg-white p-5 rounded-lg w-96 flex flex-col justify-center items-center">
              <h1 className="text-xl font-bold mb-2">Exames Contrastados</h1>
              <span>
                Considerar exames realizados nas últimas 48 horas, com
                internação ou não.
              </span>
            </div>
          </div>
        )}

        <Controller
          name="hereditaryFactor"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel id="hereditaryFactor-group-label">
                Fator Hereditário
              </FormLabel>
              <RadioGroup
                aria-labelledby="hereditaryFactor-group-label"
                value={field.value ?? ''}
                name="hereditaryFactor-group"
                onChange={(event) => {
                  field.onChange(event)
                }}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          )}
        />

        <Controller
          name="icc"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel id="icc-group-label">ICC</FormLabel>
              <RadioGroup
                aria-labelledby="icc-group-label"
                value={field.value ?? ''}
                name="icc-group"
                onChange={(event) => {
                  field.onChange(event)
                }}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={
          isLoadingEditPatient || isLoadingNewPatient || isLoadingUpdatePatient
        }
        variant="contained"
      >
        Submit
      </Button>
    </form>
  )
}

export { Register }
