import { FormEvent } from 'react'
import { Button } from '../../Components/Buttons/Button/Button'
import { Input } from '../../Components/Forms/Input/Input'
import styles from './Login.module.css'
import { LoginData } from '../../types/types'
import { NavLink } from 'react-router'

type LoginProps = {
  login: (body: LoginData) => void
}

export const Login = ({ login }: LoginProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body: LoginData = {
      email: formData.get('correo')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
    }
    login(body)
  }

  return (
    <div className={styles.card}>
      <h2>Inicio de Sesion</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label={'Usuario o Correo'}
          type={'text'}
          name={'correo'}
          placeholder={'Correo'}
        ></Input>
        <Input
          label={'Contraseña'}
          type={'password'}
          name={'password'}
          placeholder={'Contraseña'}
        ></Input>
        <Button type="submit">Iniciar Sesion</Button>
      </form>
      <span>
        Si aun no te registraste haslo <NavLink to={'/register'}>Aqui</NavLink>
      </span>
    </div>
  )
}
