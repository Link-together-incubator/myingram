import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useLoginUserMutation, useResetPasswordMutation } from '@/entities/user/api/userApi'
import { LoginArgs } from '@/entities/user/user.types'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { setIsLoggedIn } from '@/shared/model/appSlice'
import { Button, Card, Input } from '@/shared/ui'

import s from './SignInForm.module.scss'



export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginArgs>({
    defaultValues: { email: '', password: '' }, mode: 'onBlur', reValidateMode: 'onBlur'
  })
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const onSubmit: SubmitHandler<LoginArgs> = async (data) => {
    try {
      const response = await loginUser(data).unwrap()
      sessionStorage.setItem('access-token', response.accessToken)
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      reset()
      router.push('/')
    } catch (err) {
      console.error('Login failed:', err)
    }
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
            <Input variant="email"
                   {...register('email', {
                     required: 'Email is required',
                     pattern: {
                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                       message: 'Invalid email address',
                     },
                   })}
                   error={!!errors.email}
                   helperText={errors.email?.message}
            />
          </div>
          <div>
            <Input variant="password"
                   {...register('password', {
                     required: 'Password is required',
                     minLength: {
                       value: 6,
                       message: 'Password must be at least 6 characters',
                     },
                     maxLength: {
                       value: 20,
                       message: 'Password must be at most 20 characters',
                     },
                     pattern: {
                       value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/,
                       message: 'Password should contain letters, numbers and special characters',
                     },
                   })}
                   error={!!errors.password}
                   helperText={errors.password?.message}
            />
          </div>
          <div className={s.errorContainer}>
            {(errors.email || errors.password) && (
              <span className={s.error}>
                {errors.email?.message || errors.password?.message}
              </span>
            )}
          </div>
        </div>
        <div className={s.buttonWrapper}>
          <div className={s.forgotPassword}>
            <Button variant={'link'} href="/password-recovery">
              Forgot Password
            </Button>
          </div>
          <Button
            variant="default"
            type="submit"
            disabled={!isValid || isLoading}
          >
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
