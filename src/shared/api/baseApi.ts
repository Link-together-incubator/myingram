import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ACCESS_TOKEN } from '../constants/const'
import { getCropString } from '../lib/utils/getCropString'
import { setAppError } from '../model/appSlice'

type ErrorData = {
  errorsMessages?: string[] | { field: string; message: string }[]
}

export const baseApi = createApi({
  reducerPath: 'ingramApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_URL_API,
      credentials: 'include',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
      },
    })(args, api, extraOptions)

    let error = 'Error! Server is not available'

    if (result.error) {
      const isAuthMeRequest =
        typeof args === 'string'
          ? args.includes('auth/me')
          : 'url' in args && args.url.includes('auth/me')

      if (!isAuthMeRequest) {
        switch (result.error.status) {
          case 'FETCH_ERROR':
          case 'PARSING_ERROR':
          case 'CUSTOM_ERROR':
            error = result.error.error
            break

          case 404:
            error = 'No content found'
            break

          case 403:
            error = 'Not enough rights'
            break

          case 401:
            error = 'An unauthorized user'
            break

          case 400:
            const errorData = result.error.data as ErrorData
            if (typeof errorData?.errorsMessages?.[0] === 'string') {
              error = errorData.errorsMessages[0]
            } else if (typeof errorData?.errorsMessages?.[0] === 'object') {
              error = errorData.errorsMessages[0].message
            }

            break
        }

        if (typeof error !== 'string') {
          error = 'Error! Server is not available'
        }
        api.dispatch(
          setAppError({
            message: getCropString(error, 30),
            type: 'error',
          }),
        )
      }
    }
    return result
  },
  endpoints: () => ({}),
  tagTypes: [],
  refetchOnFocus: true,
})
