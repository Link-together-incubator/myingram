'use client'

import { createContext, useContext } from 'react'

type ModalContextType = {
  openPostModal: (id: string) => void
  closePostModal: () => void
  openAvatarModal: () => void
  closeAvatarModal: () => void
}

export const ModalContext = createContext<ModalContextType | null>(null)

export const usePostModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}
