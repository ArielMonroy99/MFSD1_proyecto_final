import { InputProps } from '../../../types/component.types'
import styles from './TextArea.module.css'

export const TextArea = ({ label, name, placeholder }: InputProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <textarea
        className={styles.textarea}
        name={name}
        placeholder={placeholder}
        rows={6}
      ></textarea>
    </div>
  )
}
