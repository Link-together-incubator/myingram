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

export type UserValidationPayload = { name: string; email: string }
export type LoginPayload = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export type VerificationPayload = {
  email: string
}
