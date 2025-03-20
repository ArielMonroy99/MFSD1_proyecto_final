export type LoginData = {
  correo:string,
  password:string
}

export type AuthContextType = {
  user?: User
  login: (data: LoginData) => void
  logout: () => void
  getInfo: () => void
  isLogged: () => boolean
  register: (user: UserRegisterData) => void
  isLoading: boolean
}

export type User = {
  correo: string
  nombre: string
  id: string
}

export type UserRegisterData = {
  correo: string
  nombre: string
  password: string
}

export type Task = {
  id:number
  titulo: string
  descripcion: string
  estado: number
  fecha_limite: Date
  usuario_id: number
} 

export type QueryParams = {
  filtro: string
  fechaAntesDe: string
  fechaDespuesDe: string
  estado:string
}