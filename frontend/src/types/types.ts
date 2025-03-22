export type LoginData = {
  email:string,
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
  email: string
  name: string
  id: string
}

export type UserRegisterData = {
  correo: string
  nombre: string
  password: string
}

export type Task = {
  id:number
  title: string
  description: string
  status: string
  due_date: Date
  user_id: number
} 

export type QueryParams = {
  search: string
  dateBefore: string
  dateAfter: string
  status:string
}