import { AppAlertClient } from '@/entities/post/ui/AppAlertClient/AppAlertClient'
import { baseFetch } from '@/shared/lib/utils/baseFetch'

import { PostPayload } from '../../../post.types'

import { PostModal } from './PostModal'

type PostModalServerSideProps = {
  postId: string
}

export const PostModalServerSide = async ({
  postId,
}: PostModalServerSideProps) => {
  let data = null
  try {
    data = await baseFetch<PostPayload>('posts/' + postId)
  } catch (err) {
    return <AppAlertClient message={(err as Error).message} type="error" />
  }

  return <PostModal post={data} />
}
