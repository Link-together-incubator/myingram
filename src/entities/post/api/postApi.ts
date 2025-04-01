import { baseApi } from '@/shared/api/baseApi'

import { CreatePostPayload } from '../post.types'

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<void, CreatePostPayload>({
      query: (payload) => {
        return {
          url: 'posts',
          method: 'POST',
          body: payload,
        }
      },
    }),
  }),
})

export const { useCreatePostMutation } = postApi
