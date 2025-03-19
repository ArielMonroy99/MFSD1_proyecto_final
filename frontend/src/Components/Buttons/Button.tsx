import { MouseEventHandler } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  handler?: MouseEventHandler
  children: string
  type?: 'button' | 'submit'
}

export const Button = ({ handler, children, type }: ButtonProps) => {
  return (
    <button type={type ?? 'button'} className={styles.primary} onClick={handler}>
      {children}
    </button>
  )
}
