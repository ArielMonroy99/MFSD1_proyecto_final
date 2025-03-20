import { MouseEventHandler, ReactElement } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  handler?: MouseEventHandler
  children: string | ReactElement
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'edit'
  icon?: boolean
}

export const Button = ({
  handler,
  children,
  type,
  variant = 'primary',
  icon = false,
}: ButtonProps) => {
  return (
    <button
      type={type ?? 'button'}
      className={`${styles.button} ${icon ? styles.icon : ''} ${styles[variant]} `}
      onClick={handler}
    >
      {children}
    </button>
  )
}
