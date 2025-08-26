'use client'
import { useEffect, useState } from 'react'

import { ServerSideProvider } from '@/_app/providers'
import { GetPostsPayload } from '@/entities/post/post.types'
import { UserProfile } from '@/entities/profile/model/profile.types'
import { ACCESS_TOKEN } from '@/shared/constants/const'
import { ServerComponentProps } from '@/shared/lib/types/types'
import { baseFetch } from '@/shared/lib/utils/baseFetch'
import Profile from '@/views/Profile/profile'

function ProfilePage({ params }: ServerComponentProps<{ id: string }>) {
  const { id } = params
  const [profileData, setProfileData] = useState<UserProfile | null>(null)
  const [postsData, setPostsData] = useState<GetPostsPayload | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      const token = await localStorage.getItem(ACCESS_TOKEN)
      const [profile, posts] = await Promise.all([
        baseFetch<UserProfile>(`profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        baseFetch<GetPostsPayload>(
          `content/posts?pageNumber=1&pageSize=8&userId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      ])
      setProfileData(profile)
      setPostsData(posts)
    }
    fetchData()
  }, [id])

  return (
    <>
      {profileData && postsData && (
        <Profile serverPostsData={postsData} serverProfile={profileData} />
      )}
    </>
  )
}

export default ServerSideProvider(ProfilePage)
