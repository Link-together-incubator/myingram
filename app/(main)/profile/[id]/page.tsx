import { ServerSideProvider } from '@/_app/providers'
import { GetPostsResponse } from '@/entities/post/post.types'
import { UserProfile } from '@/entities/profile/model/profile.types'
import { Endpoints } from '@/shared/constants/endpoints'
import { ServerComponentProps } from '@/shared/lib/types/types'
import { baseFetch } from '@/shared/lib/utils/baseFetch'
import Profile from '@/views/Profile/profile'

async function ProfilePage({ params }: ServerComponentProps<{ id: string }>) {
  const { id } = await params

  const [profileData, postsData] = await Promise.all([
    baseFetch<UserProfile>(`${Endpoints.profile}/${id}`),
    baseFetch<GetPostsResponse>(
      `${Endpoints.posts}?pageNumber=1&pageSize=8&userId=${id}`,
    ),
  ])

  return (
    <>
      {profileData && postsData && (
        <Profile serverPostsData={postsData} serverProfile={profileData} />
      )}
    </>
  )
}

export default ServerSideProvider(ProfilePage)
