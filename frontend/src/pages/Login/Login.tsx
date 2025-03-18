import { FormEvent } from 'react'
import { Button } from '../../Components/Buttons/Button'
import { Input } from '../../Components/Forms/Input'
import styles from './Login.module.css'
import { toast } from 'sonner'

export const Login = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const body = {
      correo: formData.get('correo'),
      password: formData.get('password'),
    }

    console.log(body)

    fetch('http://localhost:3001/usuario/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        if (res.status !== 200) {
          toast.error('Error al inciar sesion')
        }
        const json = await res.json()
        localStorage.setItem('token', json)
      })
      .catch((err: Error) => {
        toast.error('Error al inciar sesion' + err)
      })
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
        <Button handler={() => {}}>
          <span>Iniciar Sesion</span>
        </Button>
      </form>
    </div>
  )
}
