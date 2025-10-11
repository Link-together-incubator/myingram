import { GetPostsResponse } from '@/entities/post/post.types'
import { Endpoints } from '@/shared/constants/endpoints'

export const fetchPublicPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}${Endpoints.posts}?pageSize=4`,
    {
      next: {
        revalidate: 60,
      },
    },
  )

  if (!res.ok) {
    throw new Error('Posts fetch failed')
  }

  const data: GetPostsResponse = await res.json()
  console.log('POSTS:', data.items)
  return data.items ?? []
}
