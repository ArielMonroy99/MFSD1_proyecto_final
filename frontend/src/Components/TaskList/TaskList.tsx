import { Task } from '../../types/types'
import { TaskCard } from '../TaskCard/TaskCard'
import styles from './TaskList.module.css'

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      <ul className={styles.list}>
        {tasks.length > 0 &&
          tasks.map((task) => {
            task.fecha_limite = new Date(task.fecha_limite)
            return (
              <li key={task.id}>
                <TaskCard task={task} />
              </li>
            )
          })}
      </ul>
      {tasks.length === 0 && <h1>No hay tareas</h1>}
    </>
  )
}
