import { ReactNode } from 'react'
import styles from './Select.module.css'

export type SelectProps = {
  label: string
  name: string
  children: ReactNode
  hidden?: boolean
}

export const Select = ({ label, name, children, hidden }: SelectProps) => {
  return (
    <div className={styles.container + (hidden ? ' ' + styles.hidden : '')}>
      <label htmlFor={name}>{label}</label>
      <select id={name} className={styles.select} name={name}>
        {children}
      </select>
    </div>
  )
}
