import { baseApi } from '@/shared/api/baseApi'

import { UserProfile } from '../profile.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `profile/${userId}`,
    }),
  }),
})

export const { useGetUserProfileQuery } = profileApi
