import { ServerSideProvider } from '@/_app/providers'
import { GetPostsPayload } from '@/entities/post/post.types'
import { UserProfile } from '@/entities/profile/model/profile.types'
import { ServerComponentProps } from '@/shared/lib/types/types'
import { baseFetch } from '@/shared/lib/utils/baseFetch'
import Profile from '@/views/Profile/profile'

async function ProfilePage({ params }: ServerComponentProps<{ id: string }>) {
  const { id } = await params

  const [serverProfile, serverPostsData] = await Promise.all([
    baseFetch<UserProfile>(`profile/${id}`),
    baseFetch<GetPostsPayload>(`posts?pageNumber=1&pageSize=8&userId=${id}`),
  ])
  return (
    <Profile serverPostsData={serverPostsData} serverProfile={serverProfile} />
  )
}

export default ServerSideProvider(ProfilePage)
