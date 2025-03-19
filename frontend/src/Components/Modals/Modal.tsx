import { ReactElement, useEffect } from 'react'
import { Button } from '../Buttons/Button'
import styles from './Modal.module.css'

type ModalProps = {
  openModal: boolean
  closeModal: () => void
  children: ReactElement
  ref: React.RefObject<HTMLDialogElement | null>
}

export const Modal = ({ openModal, closeModal, children, ref }: ModalProps) => {
  useEffect(() => {
    if (openModal) {
      if (ref.current) ref.current.showModal()
    }
  }, [openModal, ref])

  return (
    <dialog ref={ref} onCancel={closeModal} className={styles.modal}>
      {children}
      <Button handler={closeModal}>Cerrar</Button>
    </dialog>
  )
}
