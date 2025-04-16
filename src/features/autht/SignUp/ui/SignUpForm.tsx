'use client'

import Link from 'next/link'

import { EMAIL_REGEX, PASSWORD_REGEX } from '@/shared/constants/validators'
import { Button, Checkbox, Input } from '@/shared/ui'

import { useSignUpForm } from '../lib/useSignUpForm'

import s from './SignUpForm.module.scss'

export const SignUpForm = () => {
  const {
    isAgreed,
    setIsAgreed,
    register,
    handleSubmit,
    errors,
    onSubmit,
    validatePasswordConfirmation,
  } = useSignUpForm()

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="Username"
        placeholder="Epam11"
        error={errors.username?.message}
        {...register('username', {
          required: 'Please enter your name',
          minLength: { value: 6, message: 'Minimum 6 characters' },
          maxLength: { value: 30, message: 'Maximum 30 characters' },
        })}
      />

      <Input
        type="email"
        label="Email"
        placeholder="Epam@epam.com"
        error={errors.email?.message}
        {...register('email', {
          required: 'Please enter your email',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Email must match format example@example.com',
          },
        })}
      />

      <Input
        variant="password"
        label="Password"
        placeholder="****************"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Minimum 6 characters' },
          pattern: {
            value: PASSWORD_REGEX,
            message:
              'Password should contain letters, numbers and special characters',
          },
        })}
      />

      <Input
        variant="password"
        label="Confirm Password"
        placeholder="****************"
        error={errors.passwordConfirmation?.message}
        {...register('passwordConfirmation', {
          required: 'Please confirm your password',
          validate: validatePasswordConfirmation,
        })}
      />

      <div className={s.wrapper}>
        <Checkbox
          id="agree"
          checked={isAgreed}
          onCheckedChange={() => setIsAgreed(!isAgreed)}
          label={
            <>
              I agree to the{' '}
              <Link href="/terms-of-service" className={s.link}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className={s.link}>
                Privacy Policy
              </Link>
            </>
          }
        />
      </div>

      <Button type="submit" variant="default" disabled={!isAgreed}>
        Sign Up
      </Button>
    </form>
  )
}
