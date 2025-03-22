import { InputProps } from '../../../types/component.types'
import styles from './Input.module.css'

export const Input = ({ label, type, name, placeholder }: InputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
      ></input>
    </div>
  )
}
