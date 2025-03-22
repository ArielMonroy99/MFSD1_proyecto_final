import { InputProps } from '../../../types/component.types'
import styles from './TextArea.module.css'

export const TextArea = ({ label, name, placeholder }: InputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        className={styles.textarea}
        name={name}
        placeholder={placeholder}
        rows={6}
      ></textarea>
    </div>
  )
}
