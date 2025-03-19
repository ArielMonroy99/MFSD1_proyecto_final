import { Task } from '../../types/types'
import { Button } from '../Buttons/Button'
import styles from './TaskCard.module.css'

type TaskCardProps = {
  task: Task
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.card_header}>
        <span className={styles.title}>{task.titulo}</span>
        <span
          className={`${styles.status} ${
            task.estado === 1 ? styles.finished : styles.not_finished
          } `}
        >
          {task.estado === 1 ? 'Terminado' : 'No Terminado'}
        </span>
      </div>
      <span>{task.fecha_limite.toLocaleDateString()}</span>
      <p className={styles.description}>{task.descripcion}</p>
      <Button handler={() => {}}>
        {task.estado === 1 ? 'Marcar como no terminado' : 'Marcar como no terminado'}
      </Button>
    </article>
  )
}
