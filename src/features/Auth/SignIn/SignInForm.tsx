import Image from 'next/image'
import Link from 'next/link'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { LoginArgs } from '@/entities/user/user.types'
import { Button, Card, Input } from '@/shared/ui'

import s from './SignInForm.module.scss'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginArgs>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginArgs) => {
    console.log('Sign In Data:', data)
  }

  const cardId = useId()

  return (
    <Card className={s.card} title="Sign In" id={cardId}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.imageWrapper}>
          <a>
            <Image
              src="/assets/images/google.svg"
              width={36}
              height={36}
              alt="Google Icon"
            />
          </a>
          <a>
            <Image
              src="/assets/images/github.svg"
              width={36}
              height={36}
              alt="Github Icon"
            />
          </a>
        </div>
        <div className={s.inputWrapper}>
          <div>
            <Input variant="email" />
          </div>
          <div>
            <Input variant="password" />
          </div>
        </div>
        <div className={s.buttonWrapper}>
          <div className={s.forgotPassword}>
            <Button variant={'link'} href="/password-recovery">Forgot Password</Button>
          </div>
          <Button variant="default" type="submit">
            Sign In
          </Button>
          <div className={s.signUpWrapper}>
            <span>Don’t have an account?</span>
            <Button href="/sign-up" variant={'link'}>
            Sign Up
          </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
