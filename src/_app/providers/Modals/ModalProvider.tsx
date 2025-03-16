'use client'

import { ReactNode } from 'react'

import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { selectError, selectShowEmailSentModal } from '@/shared/model/appSlice'
import { Alert } from '@/widgets/Alert'
import { SuccessEmailSent } from '@/widgets/SuccessEmailSent'

type ModalProviderProps = {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const emailMessage = useAppSelector(selectShowEmailSentModal)
  const message = useAppSelector(selectError)

  return (
    <>
      {message && <Alert data={message} />}
      {emailMessage && (
        <SuccessEmailSent
          message={emailMessage.message}
          title={emailMessage.title}
        />
      )}
      {children}
    </>
  )
}
