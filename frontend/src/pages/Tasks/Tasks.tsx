import { useRef, useState } from 'react'
import { Button } from '../../Components/Buttons/Button'
import { TaskList } from '../../Components/TaskList/TaskList'
import { TaksForm } from '../../Components/TaskForm/TaskForm'
import { Modal } from '../../Components/Modals/Modal'
import { useTasks } from '../../hooks/useTasks'

export const Tasks = () => {
  const [openModal, setOpenModal] = useState(false)
  const { tasks, createTask } = useTasks()
  const ref = useRef<HTMLDialogElement | null>(null)

  const closeModal = () => {
    setOpenModal(false)
    if (ref.current) ref.current.close()
  }
  return (
    <>
      <section>
        <h2>Tareas</h2>
        <Button
          handler={() => {
            setOpenModal(true)
          }}
        >
          Crear tarea
        </Button>
        <TaskList tasks={tasks} />
      </section>
      <Modal openModal={openModal} closeModal={closeModal} ref={ref}>
        <TaksForm createTask={createTask} onSuccess={closeModal} />
      </Modal>
    </>
  )
}
