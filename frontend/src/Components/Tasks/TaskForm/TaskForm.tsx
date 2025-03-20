import { FormEvent, useEffect } from 'react'
import { Button } from '../../Buttons/Button/Button'
import { Input } from '../../Forms/Input/Input'
import { toast } from 'sonner'
import { Task } from '../../../types/types'
import useAuth from '../../../hooks/useAuth'
import { TextArea } from '../../Forms/TextArea/TextArea'
import styles from './TaskForm.module.css'
import { Select } from '../../Forms/Select/Select'

type TaskFormProps = {
  createTask: (task: Task) => Promise<void>
  updateTask: (task: Task) => Promise<void>
  onSuccess?: () => void
  closeModal?: () => void
  editTask?: Task
  formRef?: React.RefObject<HTMLFormElement | null>
}

export const TaksForm = ({
  createTask,
  updateTask,
  onSuccess,
  closeModal,
  editTask,
  formRef,
}: TaskFormProps) => {
  const { user } = useAuth()

  useEffect(() => {
    if (editTask && formRef?.current) {
      const formatDateForInput = (date: Date): string => {
        return date.toISOString().split('T')[0]
      }

      const idInput = formRef.current.querySelector('input[name="id"]') as HTMLInputElement
      const tituloInput = formRef.current.querySelector('input[name="titulo"]') as HTMLInputElement
      const descripcionTextarea = formRef.current.querySelector(
        'textarea[name="descripcion"]',
      ) as HTMLTextAreaElement
      const fechaLimiteInput = formRef.current.querySelector(
        'input[name="fecha_limite"]',
      ) as HTMLInputElement
      const estadoSelect = formRef.current.querySelector(
        'select[name="estado"]',
      ) as HTMLSelectElement
      if (idInput) idInput.value = editTask.id.toString()
      if (tituloInput) tituloInput.value = editTask.titulo
      if (descripcionTextarea) descripcionTextarea.value = editTask.descripcion
      if (estadoSelect) {
        console.log('editTask.estado', editTask.estado)
        estadoSelect.value = editTask.estado.toString()
      }

      const fechaLimite =
        editTask.fecha_limite instanceof Date
          ? editTask.fecha_limite
          : new Date(editTask.fecha_limite)

      if (fechaLimiteInput) fechaLimiteInput.value = formatDateForInput(fechaLimite)
    }
  }, [editTask, formRef])

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (!formData.get('titulo')) {
      toast.info('Error datos inválidos')
      return
    }
    console.log('formData', formData.get('estado'))
    const body: Task = {
      id: formData.get('id') ? parseInt(formData.get('id') as string) : 0,
      titulo: formData.get('titulo') as string,
      descripcion: formData.get('descripcion') as string,
      estado: parseInt(formData.get('estado') as string),
      usuario_id: parseInt(user?.id ?? '1'),
      fecha_limite: new Date(formData.get('fecha_limite') as string),
    }

    try {
      if (!editTask) await createTask(body)
      else await updateTask(body)

      // Limpiar el formulario usando la referencia
      if (formRef?.current) {
        formRef.current.reset()
      }

      // Llamar a la función de éxito si existe
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error al crear/editar la tarea:', error)
      toast.error('Error al procesar la tarea')
    }
  }

  return (
    <form ref={formRef} onSubmit={submitHandler} className={styles.container}>
      <input type="hidden" name="id" />
      <Input label={'Titulo'} type={'text'} name={'titulo'} placeholder={'Titulo'} />
      <TextArea
        label={'Descripcion'}
        type={'text'}
        name={'descripcion'}
        placeholder={'Descripcion'}
      />

      <Select label={'Estado'} name={'estado'} hidden={editTask ? false : true}>
        <optgroup>
          <option value="1">Pendiente</option>
          <option value="2">En progreso</option>
          <option value="3">Terminado</option>
        </optgroup>
      </Select>

      <Input label={'Fecha limite'} type={'date'} name={'fecha_limite'} placeholder={''} />
      <div className={styles.footer}>
        <Button type="button" variant="secondary" handler={closeModal}>
          Cancelar
        </Button>
        <Button type="submit">{editTask ? 'Actualizar' : 'Enviar'}</Button>
      </div>
    </form>
  )
}
