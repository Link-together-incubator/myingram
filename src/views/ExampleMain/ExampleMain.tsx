'use client'

import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { useAuthMeQuery } from '@/features/autht/api/authApi'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { Button } from '@/shared/ui'

export default function ExampleMain() {
  const { data: user } = useAuthMeQuery()
  const { data: postData } = useGetPostsQuery({ pageNumber: 1, pageSize: 10 })
  const { openPostModal } = usePostModal()
  const handlePostModal = (postId: string) => () => {
    openPostModal(postId)
  }
  console.log('postData', postData)
  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px] text-3xl text-amber-100`}
    >
      Привет! Твой логин - {user?.name} и ты {user?.isConfirmed || 'не '}
      подтвердил почту
      {postData &&
        postData.items.map((post) => (
          <div key={post.id}>
            <h1>Author: {post.userId}</h1>
            <h2>PostId: {post.id}</h2>
            <Button
              onClick={handlePostModal(post.id)}
              variant="default"
              className="mockPostCard"
            >
              Post Card
            </Button>
          </div>
        ))}
      <div className="h-[1000px]"></div>
    </div>
  )
}
