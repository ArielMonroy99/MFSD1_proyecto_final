import { useRef, useState } from 'react'
import { Button } from '../../Components/Buttons/Button/Button'
import { TaskList } from '../../Components/Tasks/TaskList/TaskList'
import { TaksForm } from '../../Components/Tasks/TaskForm/TaskForm'
import { Modal } from '../../Components/Modals/Modal'
import { useTasks } from '../../hooks/useTasks'
import { Task } from '../../types/types'
import styles from './Tasks.module.css'
import { TaskFilter } from '../../Components/Tasks/TaskFilter/TaskFIlter'

export const Tasks = () => {
  const [openModal, setOpenModal] = useState(false)
  const [editTask, setEditTask] = useState<Task | undefined>(undefined)
  const { tasks, getTasks, createTask, updateTask, deleteTask, finishTask } = useTasks()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

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
      <h2>Tareas</h2>
      <summary>
        <h3>Filtros</h3>
        <details>
          <TaskFilter getTasks={getTasks} />
        </details>
      </summary>
      <section>
        <div className={styles.filters}></div>
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
