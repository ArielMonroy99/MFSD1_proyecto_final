import { FormEvent } from 'react'
import { Button } from '../../Components/Buttons/Button'
import { Input } from '../../Components/Forms/Input'
import styles from './Login.module.css'
import useAuth from '../../hooks/useAuth'

export const Login = () => {
  const { login } = useAuth()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body = {
      correo: formData.get('correo')?.toString() ?? '',
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
    </div>
  )
}
