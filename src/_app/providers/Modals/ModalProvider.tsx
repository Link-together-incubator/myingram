'use client'

import { ReactNode } from 'react'

import { selectShowCreatePostModal } from '@/features/post/createPost/model/postSlice'
import { AddPhoto } from '@/features/post/createPost/ui/steps/AddPhoto'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { selectError, selectShowEmailSentModal } from '@/shared/model/appSlice'
import { Alert } from '@/widgets/Alert'
import { SuccessEmailSent } from '@/widgets/SuccessEmailSent'

type ModalProviderProps = {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const emailMessage = useAppSelector(selectShowEmailSentModal)
  const message = useAppSelector(selectError)
  const userPhoto = useAppSelector(selectShowCreatePostModal)

  return (
    <>
      {message && <Alert data={message} />}
      {emailMessage && (
        <SuccessEmailSent
          message={emailMessage.message}
          title={emailMessage.title}
        />
      )}
      {userPhoto === 'addPhoto' && <AddPhoto />}
      {children}
    </>
  )
}
