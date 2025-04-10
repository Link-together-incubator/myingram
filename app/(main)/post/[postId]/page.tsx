'use client'
import { useParams, useRouter } from 'next/navigation'

import { useGetPostByIdQuery } from '@/entities/post/api/postApi'
import { PostModal } from '@/entities/post/ui/PostModal/ui/PostModal'

export default function PostPage() {
  const { postId } = useParams()
  const router = useRouter()

  const { data: post } = useGetPostByIdQuery({ postId: String(postId) })

  const handleClose = () => {
    router.back()
  }

  if (!post) return null

  return <PostModal post={post} onClose={handleClose} />
}
