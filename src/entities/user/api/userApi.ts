import { baseApi } from '@/shared/api/baseApi'

export type LoginArgs = {
  email: string
  password: string
}

type LoginResponse = {
  accessToken: string
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      void,
      { login: string; password: string; email: string }
    >({
      query: (payload) => {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: payload,
        }
      },
    }),

    loginUser: builder.mutation<LoginResponse, LoginArgs>({
      query: (payload) => ({
        url: 'auth/signin',
        method: 'POST',
        body: payload,
      })
    })
  }),
})

export const { useRegisterUserMutation, useLoginUserMutation } = userApi
