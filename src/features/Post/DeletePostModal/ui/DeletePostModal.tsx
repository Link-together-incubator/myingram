'use client'
import { useRouter } from 'next/navigation'

import { useDeletePostMutation } from '@/entities/post/api/postApi'
import { ConfirmModal } from '@/shared/ui/ConfirmModal/ConfirmModal'

type DeletePostModalProps = {
  postId: string
  onClose: () => void
}

export const DeletePostModal = ({ postId, onClose }: DeletePostModalProps) => {
  const [deletePost] = useDeletePostMutation()
  const router = useRouter()

  const handleConfirm = async () => {
    try {
      await deletePost({ postId }).unwrap()
      router.push('/')
      onClose()
    } catch (err) {
      console.error('Ошибка при удалении поста:', err)
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
