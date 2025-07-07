import {
  EditUserProfile,
  EditUserProfileWithoutFile,
  UserProfile,
} from '@/entities/profile/model/profile.types'
import { baseApi } from '@/shared/api/baseApi'

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `profile/${userId}`,
      providesTags: (result) => [{ type: 'UserProfile', id: result?.id }],
    }),
    editUserProfile: builder.mutation<EditUserProfile, FormData>({
      query: (formData) => ({
        url: 'profile/edit',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['UserProfile'],
    }),
    editUserProfilePatch: builder.mutation<
      EditUserProfileWithoutFile,
      EditUserProfileWithoutFile
    >({
      query: (data) => ({
        url: 'profile',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetUserProfileQuery,
  useEditUserProfileMutation,
  useEditUserProfilePatchMutation,
} = profileApi
