'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react'

import { useGetPostByIdQuery } from '@/entities/post/api/postApi'
import { PostModal } from '@/entities/post/ui'
import { CreatePostForm } from '@/features/Post/createPost'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { selectModals } from '@/shared/model/appSlice'
import { Alert } from '@/widgets/Alert'
import { Prompt } from '@/widgets/Prompt/ui/Prompt'
import { SuccessEmailSent } from '@/widgets/SuccessEmailSent'

type ModalContextType = {
  openPostModal: (id: string) => void
  closePostModal: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}

type ModalProviderProps = {
  children: ReactNode
}
// TODO: при открытии любой модалки = перерендер всех модалок. МБ вынести в отдельные провайдеры?
export function ModalProvider({ children }: ModalProviderProps) {
  const {
    alert,
    createPostModal,
    emailSentMessage,
    promptModal: { state: promptModalState },
  } = useAppSelector(selectModals)

  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const { data: post } = useGetPostByIdQuery(
    { postId: postId || '' },
    { skip: !postId },
  )
  const openPostModal = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('postId', id)
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const closePostModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('postId')
    router.push(`?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  useEffect(() => {
    if (
      !emailSentMessage &&
      !alert &&
      !createPostModal &&
      !promptModalState &&
      !postId
    )
      return

    const body = document.querySelector('body')
    if (!body) return

    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = 'visible'
    }
  }, [alert, createPostModal, emailSentMessage, promptModalState, postId])

  return (
    <ModalContext.Provider value={{ openPostModal, closePostModal }}>
      {emailSentMessage && (
        <SuccessEmailSent
          message={emailSentMessage.message}
          title={emailSentMessage.title}
        />
      )}
      {createPostModal && <CreatePostForm />}
      {promptModalState && <Prompt {...promptModalState} />}
      {alert && <Alert data={alert} />}
      {postId && post && <PostModal post={post} onClose={closePostModal} />}
      {children}
    </ModalContext.Provider>
  )
}
