import { baseApi } from '@/shared/api/baseApi'
import { buildQueryString } from '@/shared/lib/utils/queryParams'

import {
  GetPostsPayload,
  GetPostsQueryParamPayload,
  PostByIdPayload,
  PostPayload,
  UpdatePostPayload,
  UpdatePostResponse,
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
    getPosts: builder.query<GetPostsPayload, GetPostsQueryParamPayload>({
      query: (param = {}) => {
        const queries = buildQueryString(param)
        return {
          url: `posts${queries}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
  useDeletePostMutation,
} = postApi
