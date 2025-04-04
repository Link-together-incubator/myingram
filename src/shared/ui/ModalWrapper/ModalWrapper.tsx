'use client'

import { ReactNode, MouseEvent } from 'react'

import s from './ModalWrapper.module.scss'

type ModalWrapperProps = {
  onClose: () => void
  children: ReactNode
  className?: string
  onOverlayClick?: () => void
}

export function ModalWrapper({
  onClose,
  children,
  className,
  onOverlayClick,
}: ModalWrapperProps) {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (onOverlayClick) {
        onOverlayClick()
      } else {
        onClose()
      }
    }
  }

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={`${s.modal} ${className ?? ''}`}>{children}</div>
    </div>
  )
}
