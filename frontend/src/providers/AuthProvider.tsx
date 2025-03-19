import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { LoginData, User } from '../types/types'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const navigate = useNavigate()
  const login = (data: LoginData) => {
    fetch('http://localhost:3001/usuario/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        if (res.status !== 200) {
          toast.error('Error al inciar sesion')
        }
        const json = await res.json()
        localStorage.setItem('token', json.token)
        getInfo()
        navigate('/tasks')
      })
      .catch((err: Error) => {
        toast.error('Error al inciar sesion' + err)
      })
  }
  const logout = () => {
    localStorage.removeItem('token')
    setUser({} as User)
    navigate('/login')
  }
  const getInfo = () => {
    fetch('http://localhost:3001/usuario/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(async (res) => {
        if (res.status !== 200) {
          console.log(res)
          throw new Error('No autorizado')
        }
        return res.json()
      })
      .then((json) => {
        console.log(json)
        setUser(json)
      })
      .catch((err: Error) => {
        toast.error('Error al obtener la información: ' + err.message)
        setUser(undefined)
      })
      .finally(() => {
        setIsLoading(false)
        console.log(user)
      })
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
      isLogged: () => !!localStorage.getItem('token'),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading],
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
export { AuthContext }
