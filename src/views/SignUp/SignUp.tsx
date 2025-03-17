'use client'

import Image from 'next/image'
import Link from 'next/link'

import { SignUpForm } from '@/features/Auth/SignUp'

import s from './SignUp.module.scss'

export function SignUp() {
  return (
    <div className={s.wrapper}>
      <div>
        <h1 className={s.main}>Sign Up</h1>

        <div className={s.imageBlock}>
          <Link href={'#google'}>
            <Image
              src="/assets/svg/google.svg"
              width={36}
              height={36}
              alt="hi"
            />
          </Link>
          <Link href={'#github'}>
            <Image
              src="/assets/svg/github.svg"
              width={36}
              height={36}
              alt="hi"
            />
          </Link>
        </div>
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
