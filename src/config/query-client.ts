import { AxiosError } from 'axios'
import { QueryClient } from 'react-query'
import { toast } from 'react-toastify'

const onError = (error: unknown) => {
  let message = 'Erro desconhecido'

  if (error instanceof AxiosError && error.response) {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.reload()
    }

    message = error.response.data.message
  }
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  })
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      onError,
    },
    mutations: {
      retry: false,
      onError,
    },
  },
})

export { queryClient }
