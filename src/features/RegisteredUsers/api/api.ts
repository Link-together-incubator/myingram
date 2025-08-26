import { UserProfileListResponse } from '@/entities/profile/profile.types'
import { Endpoints } from '@/shared/constants/endpoints'

export const fetchCountRegisteredUsers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}${Endpoints.profile}`,
    {
      next: { revalidate: 60 },
    },
  )

  if (!res.ok) {
    throw new Error('Registered users fetch failed')
  }

  const data: UserProfileListResponse = await res.json()

  return data?.totalCount ?? 0
}
