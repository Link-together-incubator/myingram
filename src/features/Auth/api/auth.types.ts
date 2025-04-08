export type SignUpPayload = { login: string; password: string; email: string }
export type PasswordRecoveryPayload = { recaptchaToken: string; email: string }
export type PasswordResetPayload = {
  recoveryCode: string
  password: string
}
export type LoginArgs = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export type LoginPayload = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export type VerificationPayload = {
  email: string
}

export type AuthMeResponse = {
  id: string
  name: string
  email: string
  isConfirmed: string
}
