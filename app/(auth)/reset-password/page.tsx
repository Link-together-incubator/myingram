'use client'

import { Suspense } from 'react'

import { ResetPasswordForm } from '@/features/autht/PasswordRecovery'

export default function PasswordRecovery() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
