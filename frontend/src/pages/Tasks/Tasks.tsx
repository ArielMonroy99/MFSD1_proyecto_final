import { FormEvent, useRef, useState } from 'react'
import { Button } from '../../Components/Buttons/Button/Button'
import { TaskList } from '../../Components/Tasks/TaskList/TaskList'
import { TaksForm } from '../../Components/Tasks/TaskForm/TaskForm'
import { Modal } from '../../Components/Modals/Modal'
import { useTasks } from '../../hooks/useTasks'
import { QueryParams, Task } from '../../types/types'
import { Input } from '../../Components/Forms/Input/Input'
import { Select } from '../../Components/Forms/Select/Select'
import styles from './Tasks.module.css'

export const Tasks = () => {
  const [openModal, setOpenModal] = useState(false)
  const [editTask, setEditTask] = useState<Task | undefined>(undefined)
  const { tasks, getTasks, createTask, updateTask, deleteTask, finishTask } = useTasks()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const submitFilterHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const filters: QueryParams = {
      estado: formData.get('estado') as string,
      fechaAntesDe: formData.get('fechaAntesDe') as string,
      fechaDespuesDe: formData.get('fechaDespuesDe') as string,
      filtro: formData.get('filtro') as string,
    }
    await getTasks(filters)
  }

  const openEditModal = (task: Task) => {
    setEditTask(task)
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
    if (dialogRef.current) dialogRef.current.close()
  }

  const openModalHandler = () => {
    formRef.current?.reset()
    setEditTask(undefined)
    setOpenModal(true)
  }
  return (
    <>
      <section>
        <h2>Tareas</h2>
        <div className={styles.filters}>
          <form onSubmit={submitFilterHandler}>
            <div className={styles.form}>
              <Input label={'Filtro'} type={'text'} name={'filtro'} placeholder={'Filtro'} />
              <Input label={'Desde'} type={'date'} name={'fechaDespuesDe'} placeholder={''} />
              <Input label={'Hasta'} type={'date'} name={'fechaAntesDe'} placeholder={''} />
              <Select label={'Estado'} name={'estado'}>
                <optgroup label={'Estado'}>
                  <option value={''}>Todos</option>
                  <option value={1}>Pendiente</option>
                  <option value={2}>En Progreso</option>
                  <option value={3}>Compleatada</option>
                </optgroup>
              </Select>
            </div>
            <Button type={'submit'}>Filtrar</Button>
          </form>
        </div>
        <Button handler={openModalHandler}>Crear tarea</Button>
        <TaskList
          tasks={tasks}
          setEditTask={openEditModal}
          deleteTask={deleteTask}
          finishTask={finishTask}
        />
      </section>
      <Modal title={'Nueva tarea'} openModal={openModal} closeModal={closeModal} ref={dialogRef}>
        <TaksForm
          createTask={createTask}
          updateTask={updateTask}
          onSuccess={closeModal}
          closeModal={closeModal}
          editTask={editTask}
          formRef={formRef}
        />
      </Modal>
    </>
  )
}
