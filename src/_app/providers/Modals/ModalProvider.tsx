'use client'
import { useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

import { CreatePostForm } from '@/features/Post/createPost'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { selectModals } from '@/shared/model/appSlice'
import { Alert } from '@/widgets/Alert'
import { Prompt } from '@/widgets/Prompt/ui/Prompt'
import { SuccessEmailSent } from '@/widgets/SuccessEmailSent'

// TODO: при открытии любой модалки = перерендер всех модалок. МБ вынести в отдельные провайдеры?
export function ModalProvider({ children }: PropsWithChildren) {
  const {
    alert,
    createPostModal,
    emailSentMessage,
    promptModal: { state: promptModalState },
  } = useAppSelector(selectModals)

  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  useEffect(() => {
    if (!emailSentMessage && !createPostModal && !promptModalState && !postId)
      return

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [createPostModal, emailSentMessage, promptModalState, postId])

  return (
    <>
      {emailSentMessage && (
        <SuccessEmailSent
          message={emailSentMessage.message}
          title={emailSentMessage.title}
        />
      )}
      {createPostModal && <CreatePostForm />}
      {promptModalState && <Prompt {...promptModalState} />}
      {alert && <Alert data={alert} />}

      {children}
    </>
  )
}
