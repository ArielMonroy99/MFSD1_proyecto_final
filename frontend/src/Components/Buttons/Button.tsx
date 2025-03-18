import { MouseEventHandler, ReactElement } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  handler: MouseEventHandler
  children: ReactElement
}

export const Button = ({ handler, children }: ButtonProps) => {
  return (
    <button className={styles.primary} onClick={handler}>
      {children}
    </button>
  )
}
