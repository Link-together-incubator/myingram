'use client'

import { Suspense } from 'react'

import { ResetPasswordForm } from '@/features/auth/PasswordRecovery'

export default function PasswordRecovery() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
