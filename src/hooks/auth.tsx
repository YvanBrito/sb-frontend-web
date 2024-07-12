import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react'
import { toast } from 'react-toastify'
import api from '../utils/api'
import { AxiosError } from 'axios'

export interface User {
  _id: string
  name: string
  email: string
  position: string
  permissions: string[]
  role: string
  registrationNumber: string
  lastLogin: string
}

interface IAuthContextData {
  signed: boolean
  user: User | null
  loadingAuth: boolean
  loading: boolean
  signedUp: boolean
  setSignedUp(signedUp: boolean): void
  signIn(email: string, password: string): Promise<void>
  signOut(): void
  signUp(
    name: string,
    email: string,
    passwordOne: string,
    position: string,
    registrationNumber: string,
  ): void
  resetPassword(email: string): Promise<{ data: { message: string } }>
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

interface IAuthProvider {
  children: React.ReactElement
}

let runUseEffectOnce = false

export const AuthProvider: React.FC<IAuthProvider> = ({
  children,
}: IAuthProvider) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [signedUp, setSignedUp] = useState<boolean>(false)
  const [loadingAuth, setLoadingAuth] = useState(false)

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = localStorage.getItem('@SBAuth:user')
      const storagedToken = localStorage.getItem('@SBAuth:token')

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`

        setUser(JSON.parse(storagedUser))
      } else {
        localStorage.clear()
        setUser(null)
      }
      setLoading(false)
    }

    if (!runUseEffectOnce) {
      runUseEffectOnce = true
      loadStorageData()
    }
  }, [])

  async function signIn(email: string, password: string) {
    setLoadingAuth(true)
    try {
      const { data: accessToken } = await api.post('/auth/login', {
        email,
        password,
      })

      localStorage.setItem('@SBAuth:token', accessToken)
      api.defaults.headers.Authorization = `Bearer ${accessToken}`

      const { data: userTemp } = await api.get('/user')
      localStorage.setItem('@SBAuth:user', JSON.stringify(userTemp))
      setUser(userTemp)
    } catch (error: unknown) {
      let message = 'Erro desconhecido'

      if (error instanceof AxiosError && error.response)
        message = error.response.data.message
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    } finally {
      setLoadingAuth(false)
    }
  }

  function signOut() {
    localStorage.clear()
    setUser(null)
  }

  async function signUp(
    name: string,
    email: string,
    password: string,
    position: string,
    registrationNumber: string,
  ) {
    try {
      setLoadingAuth(true)
      await api.post('/auth/signup', {
        name,
        email,
        password,
        position,
        registrationNumber,
      })
      setSignedUp(true)
    } catch (error: unknown) {
      let message = 'Erro desconhecido'

      if (error instanceof AxiosError && error.response)
        message = error.response.data.message
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    } finally {
      setLoadingAuth(false)
    }
  }

  async function resetPassword(email: string) {
    const data = await api.post('/auth/send-recover-email', { email })

    return data
  }

  const authProviderValue = useMemo(
    () => ({
      signed: !!user,
      user,
      loading,
      signedUp,
      setSignedUp,
      loadingAuth,
      signIn,
      signOut,
      signUp,
      resetPassword,
    }),
    [loading, loadingAuth, signedUp, user],
  )

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
