'use client'

import { SignUpForm } from '@/features/auth/ui/signUpForm/SignUpForm'

import s from './page.module.scss'

export default function SignUp() {
  return (
    <div className={s.wrapper}>
      <div>
        <h1 className={s.main}>Sign Up</h1>

        <div className={s.imageBlock}>
          <a>
            <img src="../../../src/_app/assets/images/google.png" />
          </a>
          <a>
            <img src="@/_app/assets/images/gitHub.png" />
          </a>
        </div>
      </div>

      <SignUpForm />

      <div className={s.signInBlock}>
        <span>Do you have an account?</span>
        <a href="/sign-in" className={s.signInLink}>
          Sign In
        </a>
      </div>
    </div>
  )
}
