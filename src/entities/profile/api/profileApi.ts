import {
  EditUserProfileWithoutFile,
  UserProfile,
} from '@/entities/profile/model/profile.types'
import { baseApi } from '@/shared/api/baseApi'

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfile, string>({
      query: (userId) => `profile/${userId}`,
      providesTags: ['UserProfile'],
    }),
    editUserProfile: builder.mutation<void, FormData>({
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
      invalidatesTags: ['UserProfile'],
    }),
    deleteUserAvatar: builder.mutation<void, void>({
      query: () => ({
        url: `profile/photo`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
})

export const {
  useEditUserProfileMutation,
  useEditUserProfilePatchMutation,
  useGetUserProfileQuery,
  useDeleteUserAvatarMutation,
} = profileApi
