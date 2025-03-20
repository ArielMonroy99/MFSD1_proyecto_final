import { ReactElement, useEffect } from 'react'
import styles from './Modal.module.css'

type ModalProps = {
  openModal: boolean
  closeModal: () => void
  children: ReactElement
  ref: React.RefObject<HTMLDialogElement | null>
  title?: string
}

export const Modal = ({ openModal, closeModal, children, ref, title = 'Modal' }: ModalProps) => {
  useEffect(() => {
    if (openModal) {
      if (ref.current) ref.current.showModal()
    }
  }, [openModal, ref])

  return (
    <dialog ref={ref} onCancel={closeModal} className={styles.modal}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </dialog>
  )
}
