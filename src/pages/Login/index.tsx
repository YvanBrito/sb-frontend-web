import { TextField, Button } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import logo from '../../assets/img/logo.png'
import { useAuth } from '../../hooks/auth'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'

const schema = Joi.object({
  email: Joi.string().required().messages({
    'string.empty': '"Email" não pode ser um campo vazio',
    'any.required': '"Email" é um campo obrigatório',
  }),
  password: Joi.string().required().messages({
    'string.empty': '"Senha" não pode ser um campo vazio',
    'any.required': '"Senha" é um campo obrigatório',
  }),
})

const Login: React.FC = () => {
  const { loadingAuth, signIn } = useAuth()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: joiResolver(schema),
  })

  const handleSignIn = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    await signIn(email, password)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <img className="w-3/4 md:w-96" alt="logo" src={logo} />
      {loadingAuth ? (
        <span>Carregando...</span>
      ) : (
        <form
          className="flex flex-col gap-4 mt-8 w-72"
          onSubmit={handleSubmit(handleSignIn, (error) => console.log(error))}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                type="text"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Senha"
                variant="outlined"
                type="password"
              />
            )}
          />
          <Button
            aria-label="submitBtn"
            variant="contained"
            disabled={loadingAuth}
            type="submit"
          >
            ENTRAR
          </Button>
        </form>
      )}
    </div>
  )
}

export default Login
