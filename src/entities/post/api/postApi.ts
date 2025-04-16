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
      query: (formData) => ({
        url: 'posts',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation<UpdatePostResponse, UpdatePostPayload>({
      query: ({ postId, description }) => {
        return {
          url: `posts/${postId}`,
          method: 'PUT',
          body: { description },
        }
      },
      invalidatesTags: (result, error, { postId }) => {
        return [{ type: 'Post', id: postId }]
      },
    }),
    getPostById: builder.query<PostPayload, PostByIdPayload>({
      query: ({ postId }) => {
        return {
          url: `posts/${postId}`,
          method: 'GET',
        }
      },
      providesTags: (result, error, { postId }) => {
        return [{ type: 'Post', id: postId }]
      },
    }),
    deletePost: builder.mutation<void, { postId: string }>({
      query: ({ postId }) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled, getState }) {
        const rootState = getState() as RootState

        const invalidatedSubscriptions = postApi.util.selectInvalidatedBy(
          rootState,
          [{ type: 'Post', id: 'LIST' }],
        )
        const patchResults = invalidatedSubscriptions
          .map(({ endpointName, originalArgs }) => {
            if (endpointName !== 'getPosts') return

            return dispatch(
              postApi.util.updateQueryData(
                endpointName,
                originalArgs,
                (draft) => {
                  draft.items = draft.items.filter((post) => post.id !== postId)
                },
              ),
            )
          })
          .filter(Boolean)

        try {
          await queryFulfilled
        } catch {
          patchResults.forEach((patchResult) => patchResult?.undo())
        }
      },
    }),
    getPosts: builder.query<GetPostsPayload, GetPostsQueryParamPayload>({
      query: (param = {}) => {
        const queries = buildQueryString(param)
        return {
          url: `posts${queries}`,
          method: 'GET',
        }
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.userId}`
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.pageNumber === 1 && currentCache.items.length > 0)
          return currentCache
        return {
          ...newItems,
          items: [...currentCache.items, ...newItems.items],
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.pageNumber !== previousArg?.pageNumber
      },
      providesTags: () => [{ type: 'Post' as const, id: 'LIST' }],
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
