import { InputProps } from '../../../types/component.types'
import styles from './Input.module.css'

export const Input = ({ label, type, name, placeholder }: InputProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input className={styles.input} type={type} name={name} placeholder={placeholder}></input>
    </div>
  )
}
