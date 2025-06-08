'use client'

import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import s from './ModalWrapper.module.scss'

type ModalWrapperProps = {
  onClose: () => void
  children: ReactNode
  className?: string
  onOverlayClick?: () => void
  parent?: HTMLElement
}

export function ModalWrapper({
  onClose,
  children,
  className,
  parent,
  onOverlayClick,
}: ModalWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  useEffect(() => {
    timer.current = setTimeout(() => {
      setIsMounted(true)
    }, 500)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (onOverlayClick) {
        onOverlayClick()
      } else {
        onClose()
      }
    }
  }
  console.log('Render ModalWrapper')
  const modalContent = (
    <div
      key={'modal-wrapper'}
      className={`${s.overlay}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${s.modal} ${!isMounted ? s.animate : ''} ${className ?? ''}`}
      >
        {children}
      </div>
    </div>
  )

  if (!isMounted) return modalContent
  return createPortal(modalContent, parent || document.body)
}
