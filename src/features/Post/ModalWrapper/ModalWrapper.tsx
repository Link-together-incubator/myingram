'use client'

import { ReactNode, MouseEvent } from 'react'

import s from './ModalWrapper.module.scss'

type ModalWrapperProps = {
  onClose: () => void
  children: ReactNode
}

export function ModalWrapper({ onClose, children }: ModalWrapperProps) {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.modal}>{children}</div>
    </div>
  )
}
