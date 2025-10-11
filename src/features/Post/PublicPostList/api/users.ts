import { UserProfile } from '@/entities/profile/model/profile.types'
import { Endpoints } from '@/shared/constants/endpoints'

export const fetchUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}${Endpoints.profile}/${userId}`,
    {
      next: { revalidate: 60 },
    },
  )

  console.log('res', res)
  // if (!res.ok) {
  //   throw new Error(`Failed to fetch profile for user ${userId}`)
  // }
  const text = await res.text()
  if (!text || res.status === 204) {
    return null
  }
  return JSON.parse(text)
}
