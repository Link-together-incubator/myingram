'use client'
import { useEffect, useState } from 'react'

import { AppAlertClient } from '@/entities/post/ui/AppAlertClient/AppAlertClient'
import { ACCESS_TOKEN } from '@/shared/constants/const'
import { baseFetch } from '@/shared/lib/utils/baseFetch'

import { PostPayload } from '../../../post.types'

import { PostModal } from './PostModal'

type PostModalServerSideProps = {
  postId: string
}

export const PostModalServerSide = ({ postId }: PostModalServerSideProps) => {
  const [data, setData] = useState<PostPayload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem(ACCESS_TOKEN)
        const result = await baseFetch<PostPayload>('content/posts/' + postId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setData(result)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [postId])
  try {
    if (loading) return <div>Loading...</div>
    if (error) throw new Error(error)
  } catch (err) {
    return <AppAlertClient message={(err as Error).message} type="error" />
  }
  if (!data) return null
  return <PostModal post={data} />
}
