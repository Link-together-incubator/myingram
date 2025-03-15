export type SignUpPayload = { login: string; password: string; email: string }
export type PasswordRecoveryPayload = { recaptchaToken: string; email: string }
export type PasswordResetPayload = {
  recoveryCode: string
  password: string
}
