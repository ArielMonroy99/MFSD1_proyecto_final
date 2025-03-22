import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { LoginData, User, UserRegisterData } from '../types/types'
import { AuthContext } from './AuthContext'
import { Endpoints } from '../constants/constants'
import axios from 'axios'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const API_HOST = import.meta.env.VITE_BASE_URL
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()
  const login = async (data: LoginData) => {
    try {
      const response = await axios.post(`${API_HOST}${Endpoints.LOGIN}`, data, {
        withCredentials: true,
      })
      if (response.status !== 200) {
        toast.error('Error al iniciar sesión')
        return
      }
      await getInfo()
      navigate('/tasks')
    } catch (error) {
      toast.error('Error al iniciar sesión' + error)
      console.log(error)
      return
    }
  }
  const logout = async () => {
    try {
      const response = await axios.post(
        `${API_HOST}${Endpoints.LOGOUT}`,
        {},
        { withCredentials: true },
      )
      if (response.status !== 200) {
        toast.error('Error al cerrar sesión')
        return
      }
      setUser({} as User)
      navigate('/login')
    } catch (error) {
      toast.error('Error al cerrar sesión' + error)
      console.log(error)
    }
  }

  const getInfo = async () => {
    try {
      const response = await axios.get(`${API_HOST}${Endpoints.USER_INFO}`, {
        withCredentials: true,
      })
      setIsLoading(false)

      if (response.status !== 200) {
        toast.error('Error al obtener la información')
        setUser(undefined)
        return
      }
      setUser(response.data)
      return
    } catch (error) {
      toast.error('Error al obtener la información' + error)
      console.log(error)
      setIsLoading(false)
      setUser(undefined)
      return
    }
  }

  const register = async (user: UserRegisterData) => {
    try {
      const response = await axios.post(`${API_HOST}${Endpoints.REGISTER}`, user, {
        withCredentials: true,
      })
      if (response.status !== 200) {
        toast.error('Error crear usuaario')
      }
      navigate('/login')
    } catch (error) {
      toast.error('Error al crear usuario' + error)
      console.log(error)
      return
    }
  }

  useEffect(() => {
    getInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const memoizedValue = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
      getInfo,
      register,
      isLogged: () => !!localStorage.getItem('token'),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading],
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
export { AuthContext }
