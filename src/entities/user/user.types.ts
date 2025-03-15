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