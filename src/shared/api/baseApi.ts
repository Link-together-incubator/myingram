import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setAppError } from '../model/appSlice'

export const baseApi = createApi({
  reducerPath: 'ingramApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_URL_API,
      prepareHeaders: () => {},
    })(args, api, extraOptions)
    let error = 'Произошла ошибка'
    console.log(result)

    if (result.error) {
      // todo: проверить обработку (неправильная)
      switch (result.error.status) {
        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
          error = result.error.error
          break

        case 403:
          error = '403 Ошибка доступа. Проверь API-KEY'
          break

        case 400:
          error = (result.error.data as { message: string }).message
          break

        default:
          error = JSON.stringify(result.error)
          break
      }
      api.dispatch(setAppError({ error }))
    }
    return result
  },
  endpoints: () => ({}),
  tagTypes: [],
  refetchOnFocus: true,
})
