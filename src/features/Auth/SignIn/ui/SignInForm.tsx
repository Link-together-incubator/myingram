'use client'

import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { LoginArgs } from '@/features/auth/api/auth.types'
import { useLoginUserMutation } from '@/features/auth/api/authApi'
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/shared/constants/validators'
import { Button, Card, Input } from '@/shared/ui'

import { Services } from '../../Services/ui/Services'

import s from './SignInForm.module.scss'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginArgs>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const cardId = useId()

  return (
    <Card className={s.card} title="Sign In" id={cardId}>
      <Services />
      <form className={s.form} onSubmit={handleSubmit(loginUser)}>
        <div className={s.inputWrapper}>
          <Input
            type="email"
            autoComplete="email"
            error={errors.email ? errors.email.message : null}
            variant="email"
            {...register('email', {
              required: 'Email is required', // Обязательное поле
              pattern: {
                value: EMAIL_REGEX,
                message: 'Invalid email address', // Валидация email
              },
            })}
          />
          <Input
            error={errors.password ? errors.password.message : null}
            variant="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required', // Обязательное поле
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must be at most 20 characters',
              },
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  'Password should contain letters, numbers and special characters',
              },
            })}
          />
        </div>
        <div className={s.buttonWrapper}>
          <div className={s.forgotPassword}>
            <Button variant={'link'} href="/password-recovery">
              Forgot Password
            </Button>
          </div>
          <Button variant="default" type="submit" disabled={isLoading}>
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
