'use client'

import Link from 'next/link'

import { Services } from '@/features/autht/Services'
import { SignUpForm } from '@/features/autht/SignUp'

import s from './SignUp.module.scss'

export function SignUp() {
  return (
    <div className={s.wrapper}>
      <div>
        <h1 className={s.main}>Sign Up</h1>

        <Services />
      </div>

      <SignUpForm />

      <div className={s.signInBlock}>
        <span>Do you have an account?</span>
        <Link href="/sign-in" className={s.signInLink}>
          Sign In
        </Link>
      </div>
    </div>
  )
}
