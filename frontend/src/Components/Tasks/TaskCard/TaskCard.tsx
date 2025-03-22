import { Task } from '../../../types/types'
import { Button } from '../../Buttons/Button/Button'
import styles from './TaskCard.module.css'
import { Icon } from '@iconify-icon/react'

type TaskCardProps = {
  task: Task
  editTask: (task: Task) => void
  deleteTask: (id: number) => void
  finishTask: (id: number) => void
}

export const TaskCard = ({ task, editTask, deleteTask, finishTask }: TaskCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.card_header}>
        <span className={styles.title}>{task.title}</span>
        <span
          className={`${styles.status} ${
            task.status === 'pending'
              ? styles.pending
              : task.status === 'in_progress'
              ? styles.in_progress
              : styles.finished
          } `}
        >
          {task.status === 'pending'
            ? 'Pendiente'
            : task.status === 'in_progress'
            ? 'En Progreso'
            : 'Completada'}
          .
        </span>
      </div>
      <span>{task.due_date.toLocaleDateString()}</span>
      <p className={styles.description}>{task.description}</p>
      <div className={styles.actions}>
        <Button icon variant={'primary'} handler={() => finishTask(task.id)}>
          <Icon icon={'material-symbols:check-box'} />
        </Button>
        <Button icon variant="edit" handler={() => editTask(task)}>
          <Icon icon={'material-symbols:edit'} />
        </Button>
        <Button icon variant="secondary" handler={() => deleteTask(task.id)}>
          <Icon icon={'material-symbols:delete'} />
        </Button>
      </div>
    </article>
  )
}
