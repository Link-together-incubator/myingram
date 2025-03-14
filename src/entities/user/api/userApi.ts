import { baseApi } from '@/shared/api/baseApi'

import {
  PasswordRecoveryPayload,
  PasswordResetPayload,
  SignUpPayload,
} from '../user.types'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, SignUpPayload>({
      query: (payload) => {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: payload,
        }
      },
    }),
    recoveryPassword: builder.mutation<void, PasswordRecoveryPayload>({
      query: (payload) => {
        return {
          url: 'auth/forgot-password',
          method: 'POST',
          body: payload,
        }
      },
    }),
    resetPassword: builder.mutation<void, PasswordResetPayload>({
      query: (payload) => {
        return {
          url: 'auth/reset-password',
          method: 'POST',
          body: payload,
        }
      },
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useRecoveryPasswordMutation,
  useResetPasswordMutation,
} = userApi
