import { baseApi } from '@/shared/api/baseApi'

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<void, FormData>({
      query: (formData) => {
        return {
          url: 'posts',
          method: 'POST',
          body: formData,
        }
      },
    }),
  }),
})

export const { useCreatePostMutation } = postApi
