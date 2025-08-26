import { PublicPostCard } from '@/entities/post/ui'
import {
  fetchPublicPosts,
  fetchUserProfile,
} from '@/features/Post/PublicPostList'

import s from './PublicPostList.module.scss'

export const PublicPostList = async () => {
  try {
    const posts = await fetchPublicPosts()

    const data = await Promise.all(
      posts.map(async (post) => {
        const user = await fetchUserProfile(post.userId)

        return {
          id: post.id,
          description: post.description,
          photoUrls: post.photoUrls,
          createdAt: post.createdAt,
          username: user?.userName || 'Unknown',
          avatarUrl: user?.photoUrl || '/assets/images/avatarPhoto.webp',
          postLink: `/profile/${post.userId}?postId=${post.id}`,
        }
      }),
    )

    return (
      <div className={s.posts}>
        {data.map((post, i) => (
          <PublicPostCard key={i} {...post} />
        ))}
      </div>
    )
  } catch (error) {
    console.log('Posts error:', error)
    return <div>Error fetch posts</div>
  }
}
