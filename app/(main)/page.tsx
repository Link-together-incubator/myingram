'use client'
import { useState } from 'react'

import { useAuthMeData } from '@/entities/user/lib/useAuthMeData'
import { Post, PostModal } from '@/features/Post/Post/PostModal/ui/PostModal'
import { Button } from '@/shared/ui'

const mockPost: Post = {
  id: '123',
  username: 'your_username',
  description: 'My awesome post 🧡',
  images: [
    '/assets/images/post.png',
    '/assets/images/del1.png',
    '/assets/images/del2.png',
    '/assets/images/del3.png',
  ],
}

export default function Home() {
  const user = useAuthMeData()
  const [showModal, setShowModal] = useState(false)
  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px] text-3xl text-amber-100`}
    >
      Привет! Твой логин - {user?.name} и ты {user?.isConfirmed || 'не '}
      подтвердил почту
      <Button variant="outline" onClick={() => setShowModal(true)}>
        Modal Post
      </Button>
      {showModal && (
        <PostModal post={mockPost} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
