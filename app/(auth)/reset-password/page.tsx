'use client'

import { Suspense } from 'react'

import { ResetPasswordForm } from '@/features/Auth/PasswordRecovery'

export default function PasswordRecovery() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
