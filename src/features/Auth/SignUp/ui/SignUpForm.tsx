'use client'

import Link from 'next/link'

import { EMAIL_REGEX } from '@/shared/lib/validators'
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
    isValid,
  } = useSignUpForm()

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.wrapper}>
        <Input
          type="text"
          label="Username"
          placeholder="Epam11"
          {...register('username', {
            required: 'Please enter your name',
            minLength: { value: 6, message: 'Minimum 6 characters' },
            maxLength: { value: 30, message: 'Maximum 30 characters' },
          })}
        />
        {errors.username && (
          <span className={s.errorMessage}>{errors.username.message}</span>
        )}
      </div>

      <div className={s.wrapper}>
        <Input
          type="email"
          label="Email"
          placeholder="Epam@epam.com"
          {...register('email', {
            required: 'Please enter your email',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email must match format example@example.com',
            },
          })}
        />
        {errors.email && (
          <span className={s.errorMessage}>{errors.email.message}</span>
        )}
      </div>

      <div className={s.wrapper}>
        <Input
          variant="password"
          label="Password"
          placeholder="****************"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
            pattern: {
              value: /^[a-zA-Z0-9! "#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
              message: 'Password contains invalid characters',
            },
          })}
        />
        {errors.password && (
          <span className={s.errorMessage}>{errors.password.message}</span>
        )}
      </div>

      <div className={s.wrapper}>
        <Input
          variant="password"
          label="Confirm Password"
          placeholder="****************"
          {...register('passwordConfirmation', {
            required: 'Please confirm your password',
            validate: validatePasswordConfirmation,
          })}
        />
        {errors.passwordConfirmation && (
          <span className={s.errorMessage}>
            {errors.passwordConfirmation.message}
          </span>
        )}
      </div>

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

      <Button type="submit" variant="default" disabled={!isAgreed || !isValid}>
        Sign Up
      </Button>
    </form>
  )
}
