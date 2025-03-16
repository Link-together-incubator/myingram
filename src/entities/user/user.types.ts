export type SignUpPayload = { login: string; password: string; email: string }
export type PasswordRecoveryPayload = { recaptchaToken: string; email: string }
export type PasswordResetPayload = {
  recoveryCode: string
  password: string
}

export type User = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  email: string
  name: string
  confirmationCode: string
  codeExpiration: string
  isConfirmed: boolean
  recoveryCode: string | null
  passwordHash: string
  expirationDate: string | null
}
