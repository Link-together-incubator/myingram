'use client'
import Image from 'next/image'
import { useDispatch } from 'react-redux'

import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { useGetUserProfileQuery } from '@/entities/profile/api/profileApi'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { setUploadAvatarModal } from '@/shared/model/appSlice'
import { Button } from '@/shared/ui'
export default function ExampleMain() {
  const dispatch = useDispatch()
  const { data: user } = useAuthMeQuery()
  const { data: postData } = useGetPostsQuery({ pageNumber: 1, pageSize: 10 })
  const { openPostModal } = usePostModal()
  const { data: profile } = useGetUserProfileQuery(user?.id as string)
  const handlePostModal = (postId: string) => () => {
    openPostModal(postId)
  }

  const profilePhotoUrl = profile?.photoUrl
  console.log('photoUrl:', profile?.photoUrl)

  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px] text-3xl text-amber-100`}
    >
      Привет! Твой логин - {user?.name} и ты {user?.isConfirmed || 'не '}
      подтвердил почту
      {profilePhotoUrl && (
        <Image
          src={profilePhotoUrl}
          alt="Profile"
          width={192}
          height={192}
          className="relative rounded-full object-cover"
          unoptimized
        />
      )}
      <Button
        onClick={() => dispatch(setUploadAvatarModal(true))}
        variant="outline"
      >
        Загрузить аватар
      </Button>
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
