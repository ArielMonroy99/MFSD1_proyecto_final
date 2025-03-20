import { FormEvent } from 'react'
import { Button } from '../Buttons/Button/Button'
import { Input } from '../Forms/Input/Input'
import styles from './RegisterForm.module.css'
import { UserRegisterData } from '../../types/types'

export const RegisterForm = ({ register }: { register: (user: UserRegisterData) => void }) => {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const body: UserRegisterData = {
      nombre: formData.get('nombre') as string,
      correo: formData.get('correo') as string,
      password: formData.get('password') as string,
    }
    register(body)
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h2>Registrate</h2>
      <Input label={'Nombre'} type={'text'} name={'nombre'} placeholder={'Nombre'} />
      <Input label={'Correo'} type={'email'} name={'correo'} placeholder={'Correo'} />
      <Input label={'Contraseña'} type={'password'} name={'password'} placeholder={'Contraseña'} />
      <Button type="submit">Guardar</Button>
    </form>
  )
}
