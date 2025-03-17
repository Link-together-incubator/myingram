'use client'

import Image from 'next/image'
import Link from 'next/link'

import { SignUpForm } from '@/features/Auth/SignUp'

import s from './page.module.scss'

export default function SignUp() {
  return (
    <div className={s.wrapper}>
      <div>
        <h1 className={s.main}>Sign Up</h1>

        <div className={s.imageBlock}>
          <a>
            <Image
              src="/assets/images/google.png"
              width={36}
              height={36}
              alt="hi"
            />
          </a>
          <a>
            <Image
              src="/assets/images/gitHub.png"
              width={36}
              height={36}
              alt="hi"
            />
          </a>
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
