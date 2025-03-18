import styles from './Input.module.css'

type InputProps = {
  label: string
  type: string
  name: string
  placeholder: string
  required?: boolean
  error?: string
}

export const Input = ({ label, type, name, placeholder }: InputProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input className={styles.input} type={type} name={name} placeholder={placeholder}></input>
    </div>
  )
}
