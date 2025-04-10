'use client'
import { X } from 'lucide-react'

import { Button } from '../Button/Button'
import { ModalWrapper } from '../ModalWrapper/ModalWrapper'

import s from './ConfirmModal.module.scss'

type ConfirmModalProps = {
  title: string
  message: string | React.ReactNode
  onClose: () => void
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
}

export const ConfirmModal = ({
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'Yes',
  cancelText = 'No',
}: ConfirmModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className={s.confirmModal}>
        <div className={s.header}>
          <h3 className={s.title}>{title}</h3>
          <button className={s.closeButton} onClick={onClose}>
            <X size={24} color="white" />
          </button>
        </div>

        <p className={s.message}>{message}</p>

        <div className={s.actions}>
          <Button onClick={onConfirm} variant="outline">
            {confirmText}
          </Button>
          <Button onClick={onClose} variant="default">
            {cancelText}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
