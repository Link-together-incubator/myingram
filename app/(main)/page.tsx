'use client'
import { useState } from 'react'

import { useGetPostByIdQuery } from '@/entities/post/api/postApi'
import { PostModal } from '@/entities/post/ui/PostModal/ui/PostModal'
import { useAuthMeData } from '@/entities/user/lib/useAuthMeData'
import { Button } from '@/shared/ui'

const TEST_POST_ID = '4fb24f83-d854-429e-a4e5-aee569401bc5'

export default function Home() {
  const user = useAuthMeData()
  const [showModal, setShowModal] = useState(false)

  const { data: post } = useGetPostByIdQuery({ postId: TEST_POST_ID })
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
