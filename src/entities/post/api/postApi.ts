import { baseApi } from '@/shared/api/baseApi'

import {
  UpdatePostPayload,
  PostPayload,
  UpdatePostResponse,
  PostByIdPayload,
} from '../post.types'

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
    updatePost: builder.mutation<UpdatePostResponse, UpdatePostPayload>({
      query: ({ postId, description }) => {
        return {
          url: `posts/${postId}`,
          method: 'PUT',
          body: { description },
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Post', id: postId },
      ],
    }),
    getPostById: builder.query<PostPayload, PostByIdPayload>({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}`,
          method: 'GET',
        }
      },
      providesTags: (result, error, { postId }) => [
        { type: 'Post', id: postId },
      ],
    }),
    deletePost: builder.mutation<void, { postId: string }>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
  useDeletePostMutation,
} = postApi
