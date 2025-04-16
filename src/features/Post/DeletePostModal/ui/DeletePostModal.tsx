'use client'

import { useDeletePostMutation } from '@/entities/post/api/postApi'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { ConfirmModal } from '@/shared/ui/ConfirmModal/ConfirmModal'

type DeletePostModalProps = {
  postId: string
  onClose: () => void
}

export const DeletePostModal = ({ postId, onClose }: DeletePostModalProps) => {
  const [deletePost] = useDeletePostMutation()
  const { closePostModal } = usePostModal()

  const handleConfirm = async () => {
    try {
      await deletePost({ postId }).unwrap()
      closePostModal()
    } catch (err) {
      console.error('Ошибка при удалении поста:', err)
    } finally {
      onClose()
    }
  }
  return (
    <ConfirmModal
      title="Delete Post"
      message="Are you sure you want to delete this post?"
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}
