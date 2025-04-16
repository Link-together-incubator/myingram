/* eslint-disable @typescript-eslint/no-empty-object-type */

import { PostModalServerSide } from '@/entities/post/ui'
import { ServerComponentProps } from '@/shared/lib/types/types'

export const ServerSideProvider = <T extends object = {}>(
  Component: React.ComponentType<T & ServerComponentProps>,
) => {
  const Page = async (props: T & ServerComponentProps) => {
    const { searchParams } = props
    const awaitedSearchParams = await searchParams
    const postId = awaitedSearchParams?.postId

    return (
      <>
        {typeof postId === 'string' && <PostModalServerSide postId={postId} />}
        <Component {...props} />
      </>
    )
  }

  Page.displayName = `ServerSideProvider(${Component.displayName || Component.name || 'Component'})`
  return Page
}
