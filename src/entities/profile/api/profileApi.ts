import { baseApi } from '@/shared/api/baseApi'

import { UserProfile } from '@/entities/profile/model/profile.types'
import { GeneralInformationData } from '@/entities/profile/model/GeneralInformationSchem'

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `profile/${userId}`,
    }),
    editProfile: builder.mutation<void, GeneralInformationData>({
      query: (data) => ({
        url: 'profile/edit',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useGetUserProfileQuery, useEditProfileMutation } = profileApi
