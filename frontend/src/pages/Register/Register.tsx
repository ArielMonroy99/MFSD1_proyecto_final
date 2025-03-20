import { RegisterForm } from '../../Components/RegisterForm/RegisterForm'
import { UserRegisterData } from '../../types/types'

export const Register = ({ register }: { register: (user: UserRegisterData) => void }) => {
  return <RegisterForm register={register} />
}
