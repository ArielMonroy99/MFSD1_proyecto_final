import { Task } from '../../../types/types'
import { TaskCard } from '../TaskCard/TaskCard'
import styles from './TaskList.module.css'

type TaskListProps = {
  tasks: Task[]
  setEditTask: (task: Task) => void
  deleteTask: (id: number) => void
  finishTask: (id: number) => void
}
export const TaskList = ({ tasks, setEditTask, deleteTask, finishTask }: TaskListProps) => {
  return (
    <>
      <ul className={styles.list}>
        {tasks.length > 0 &&
          tasks.map((task) => {
            task.due_date = new Date(task.due_date)
            return (
              <li key={task.id}>
                <TaskCard
                  task={task}
                  editTask={setEditTask}
                  deleteTask={deleteTask}
                  finishTask={finishTask}
                />
              </li>
            )
          })}
      </ul>
      {tasks.length === 0 && <h1>No hay tareas</h1>}
    </>
  )
}
