import { ReactElement } from 'react'
import styles from './Select.module.css'

export type SelectProps = {
  label: string
  name: string
  children: ReactElement
  hidden?: boolean
}

export const Select = ({ label, name, children, hidden }: SelectProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select hidden={hidden} className={styles.select} name={name}>
        {children}
      </select>
    </div>
  )
}
