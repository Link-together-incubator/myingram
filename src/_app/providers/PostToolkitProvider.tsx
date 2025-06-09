'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useCallback, useMemo } from 'react'

import { ModalContext } from '@/shared/lib/hooks/usePostModal'

export const PostToolkitProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPostId = searchParams.get('postId')

  const openPostModal = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams)
      params.set('postId', id)
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [searchParams, router],
  )

  const closePostModal = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.delete('postId')
    router.push(`?${params.toString()}`, { scroll: false })
  }, [searchParams, router])

  const openAvatarModal = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set('avatarModal', 'true')
    router.push(`?${params.toString()}`, { scroll: false })
  }, [searchParams, router])

  const closeAvatarModal = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.delete('avatarModal')
    router.push(`?${params.toString()}`, { scroll: false })
  }, [searchParams, router])

  const context = useMemo(() => {
    return { openPostModal, closePostModal, openAvatarModal, closeAvatarModal }
  }, [currentPostId])
  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  )
}
