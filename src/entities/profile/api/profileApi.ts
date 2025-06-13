import {
  EditUserProfileBody,
  UserProfile,
} from '@/entities/profile/model/profile.types'
import { baseApi } from '@/shared/api/baseApi'

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `profile/${userId}`,
      // providesTags: (result, error, userId) => [
      //   { type: 'UserProfile', id: userId },
      // ],
      providesTags: ['UserProfile']
    }),
    editUserProfile: builder.mutation<void, EditUserProfileBody>({
      query: ({ body, id }) => ({
        url: 'profile/edit',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
})

export const { useGetUserProfileQuery, useEditUserProfileMutation } = profileApi
