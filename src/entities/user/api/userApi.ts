import { BaseQueryArg } from '@reduxjs/toolkit/query'

import { VerificationPayload } from '@/features/auth/api/signUp/VerificationLinkArgs.types'
import { baseApi } from '@/shared/api/baseApi'

import {
  PasswordRecoveryPayload,
  PasswordResetPayload,
  SignUpPayload,
  User,
  UserValidationPayload,
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
          url: token ? `auth/verify-email?token=${token}` : `auth/verify-email`,
          method: 'GET',
        }
      },
    }),
    userValidationForSignUp: builder.query<boolean, UserValidationPayload>({
      query: ({ name, email }) => {
        return {
          url: `users/validation?name=${name}&email=${email}`,
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
  useVerifyResendMutation,
  useVerifyEmailQuery,
  useLazyUserValidationForSignUpQuery,
} = userApi
