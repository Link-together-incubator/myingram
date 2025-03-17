import { baseApi } from '@/shared/api/baseApi'

import {
  AuthMeResponse,
  LoginArgs,
  LoginResponse,
  PasswordRecoveryPayload,
  PasswordResetPayload,
  SignUpPayload,
  VerificationPayload,
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
    loginUser: builder.mutation<LoginResponse, LoginArgs>({
      query: (payload) => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    verifyResend: builder.mutation<void, VerificationPayload>({
      query: (payload) => {
        return {
          url: 'auth/verify-resend',
          method: 'POST',
          body: payload,
        }
      },
    }),
    verifyEmail: builder.query<void, string>({
      query: (token: string) => {
        return {
          url: `auth/verify-email?token=${token}`,
          method: 'GET',
        }
      },
    }),
    authMe: builder.query<AuthMeResponse, void>({
      query: () => {
        return {
          url: `auth/me`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useRecoveryPasswordMutation,
  useResetPasswordMutation,
  useLoginUserMutation,
  useVerifyResendMutation,
  useVerifyEmailQuery,
  useAuthMeQuery,
  useLazyAuthMeQuery,
} = userApi
