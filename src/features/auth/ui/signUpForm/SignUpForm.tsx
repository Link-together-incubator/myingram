'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRegisterUserMutation } from '@/entities/user/api/userApi'
import { LoginArgs } from '@/features/auth/api/signUp/SignUpArgs.types'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { setIsLoggedIn } from '@/shared/model/appSlice'
import { Button, Checkbox, Input } from '@/shared/ui'

import s from './SignUpForm.module.scss'

export const SignUpForm = () => {
  const [signUpData] = useRegisterUserMutation()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const validatePasswordConfirmation = () => {
    const { password, passwordConfirmation } = getValues()
    console.log(password, passwordConfirmation)

    return passwordConfirmation === password || 'Passwords do not match'
  }

  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    signUpData({
      login: data.username,
      email: data.email,
      password: data.password,
    }).finally(() => {
      reset()
    })
    console.log(data)
  }
  // console.log(errors)

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.wrapper}>
        <input
          type="text"
          {...register('username', {
            required: true,
            maxLength: {
              value: 30,
              message: 'Maximum number of characters 30',
            },
            minLength: {
              value: 6,
              message: 'Minimum number of characters 6',
            },
          })}
        />
        {errors.username && (
          <span className={s.errorMessage}>{errors.username.message}</span>
        )}
      </div>
      <div className={s.wrapper}>
        <input
          type="email"
          {...register('email', {
            required: 'Please enter your email',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'The email must match the format \nexample@example.com',
            },
          })}
        />
        {errors.email && (
          <span className={s.errorMessage}>{errors.email.message}</span>
        )}
      </div>
      <div className={s.wrapper}>
        <input
          type="password"
          {...register('password', {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9! "#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
              message:
                'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
            },
            minLength: {
              value: 6,
              message: 'Minimum number of characters 6',
            },
          })}
        />
        {errors.password && (
          <span className={s.errorMessage}>{errors.password.message}</span>
        )}
      </div>
      <div className={s.wrapper}>
        <input
          type="password"
          {...register('passwordConfirmation', {
            required: 'The passwords must match',
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
          id={'agree'}
          label={
            <>
              I agree to the{' '}
              <Link href="/terms-of-service">
                <span className={s.link}>Terms of Service</span>
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy">
                <span className={s.link}>Privacy Policy</span>
              </Link>
            </>
          }
        />
      </div>

      <Button variant={'default'} type={'submit'}>
        Sign Up
      </Button>
    </form>
  )
}
