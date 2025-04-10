import { baseApi } from '@/shared/api/baseApi'
import { ACCESS_TOKEN } from '@/shared/constants/const'
import { resetState } from '@/shared/lib/utils/resetStoreAction'

import {
  AuthMeResponse,
  GooglePayload,
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled.catch(console.log)
        if (response) {
          localStorage.setItem(ACCESS_TOKEN, response!.data.accessToken)
          await dispatch(userApi.endpoints.authMe.initiate())
        }
      },
    }),
    loginGoogle: builder.mutation<LoginResponse, GooglePayload>({
      query: (payload) => ({
        url: 'auth/google',
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled.catch(console.log)
        if (response) {
          localStorage.setItem(ACCESS_TOKEN, response!.data.accessToken)
          await dispatch(userApi.endpoints.authMe.initiate())
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
          keepUnusedDataFor: 0,
          cacheTime: 0,
        }
      },
    }),
    githubCallback: builder.query<AuthMeResponse, void>({
      query: () => {
        return {
          url: `auth/me`,
          method: 'GET',
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `auth/logout`,
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled.catch(console.log)
        localStorage.removeItem(ACCESS_TOKEN)

        dispatch(baseApi.util.resetApiState())
        dispatch(resetState())
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
  useLogoutMutation,
  useLoginGoogleMutation,
} = userApi
