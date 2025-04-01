'use client'
import { useEffect, useState } from 'react'

import { useAuthMeData } from '@/entities/user/lib/useAuthMeData'
import { Post, PostModal } from '@/features/Post/Post/PostModal/ui/PostModal'
import { Button } from '@/shared/ui'

export default function Home() {
  const user = useAuthMeData()
  const [showModal, setShowModal] = useState(false)
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    // Временный json-server работает на http://localhost:3001
    fetch('http://localhost:3001/posts/1')
      .then((res) => res.json())
      .then((data) => setPost(data))
  }, [])

  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px] text-3xl text-amber-100`}
    >
      Привет! Твой логин - {user?.name} и ты {user?.isConfirmed || 'не '}
      подтвердил почту
      <Button variant="outline" onClick={() => setShowModal(true)}>
        Modal Post
      </Button>
      {showModal && post && (
        <PostModal post={post} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
