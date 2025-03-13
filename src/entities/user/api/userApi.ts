import { baseApi } from '@/shared/api/baseApi'

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
  }),
})

export const { useRegisterUserMutation } = userApi
