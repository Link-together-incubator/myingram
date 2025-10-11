import { AppAlertClient } from '@/entities/post/ui/AppAlertClient/AppAlertClient'
import { Endpoints } from '@/shared/constants/endpoints'
import { baseFetch } from '@/shared/lib/utils/baseFetch'

import { Post } from '../../../post.types'

import { PostModal } from './PostModal'

type PostModalServerSideProps = {
  postId: string
}

export const PostModalServerSide = async ({
  postId,
}: PostModalServerSideProps) => {
  let data = null

  try {
    data = await baseFetch<Post>(`${Endpoints.posts}/${postId}`)
  } catch (err) {
    return <AppAlertClient message={(err as Error).message} type="error" />
  }
  return data && <PostModal post={data} />
}
