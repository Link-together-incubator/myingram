'use client'

import { ReactNode, useEffect } from 'react'

import { CreatePostForm } from '@/features/Post/createPost'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { selectModals } from '@/shared/model/appSlice'
import { Alert } from '@/widgets/Alert'
import { Prompt } from '@/widgets/Prompt/ui/Prompt'
import { SuccessEmailSent } from '@/widgets/SuccessEmailSent'

type ModalProviderProps = {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const {
    alert,
    createPostModal,
    emailSentMessage,
    promptModal: { state: promptModalState },
  } = useAppSelector(selectModals)

  useEffect(() => {
    if (!emailSentMessage && !alert && !createPostModal && !promptModalState)
      return

    const body = document.querySelector('body')
    if (!body) return

    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = 'visible'
    }
  }, [alert, createPostModal, emailSentMessage, promptModalState])

  return (
    <>
      {alert && <Alert data={alert} />}
      {emailSentMessage && (
        <SuccessEmailSent
          message={emailSentMessage.message}
          title={emailSentMessage.title}
        />
      )}
      {createPostModal && <CreatePostForm />}
      {promptModalState && <Prompt {...promptModalState} />}

      {children}
    </>
  )
}
