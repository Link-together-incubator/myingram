import { baseApi } from '@/shared/api/baseApi'

import { UserResponse } from './user.types'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query<UserResponse, string>({
      query: (id: string) => {
        return {
          url: `profile/${id}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useUserProfileQuery } = userApi
