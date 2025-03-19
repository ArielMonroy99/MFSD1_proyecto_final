import { FormEvent } from 'react'
import { Button } from '../Buttons/Button'
import { Input } from '../Forms/Input'
import { toast } from 'sonner'
import { Task } from '../../types/types'
import useAuth from '../../hooks/useAuth'

type TaskFormProps = {
  createTask: (task: Task) => Promise<void>
  onSuccess?: () => void
}

export const TaksForm = ({ createTask, onSuccess }: TaskFormProps) => {
  const { user } = useAuth()
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (!formData.get('titulo')) {
      toast.info('Erro datos invalidos')
      return
    }
    const body: Task = {
      // Provide a default or generate an ID if necessary
      id: 0,
      titulo: formData.get('titulo') as string,
      descripcion: formData.get('descripcion') as string,
      estado: 2,
      usuario_id: parseInt(user?.id ?? '1'),
      fecha_limite: new Date(formData.get('fecha_limite') as string),
    }
    await createTask(body)
    if (onSuccess) onSuccess()
  }

  return (
    <form onSubmit={submitHandler}>
      <Input label={'Titulo'} type={'text'} name={'titulo'} placeholder={'Titulo'} />
      <Input label={'Desripcion'} type={'text'} name={'descripcion'} placeholder={'Descripcion'} />
      <Input label={'Fecha limite'} type={'date'} name={'fecha_limite'} placeholder={''} />
      <Button type="submit">Enviar</Button>
    </form>
  )
}
