'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useGetUsersQuery,
  useRegisterUserMutation,
} from '@/entities/user/api/userApi'
import { LoginPayload } from '@/features/auth/api/signUp/SignUpArgs.types'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { setIsShowEmailSentModal } from '@/shared/model/appSlice'
import { Button, Checkbox, Input } from '@/shared/ui'

import s from './SignUpForm.module.scss'

export const SignUpForm = () => {
  const [isAgreed, setIsAgreed] = useState(false)

  const [signUpData] = useRegisterUserMutation()
  const { data: users } = useGetUsersQuery(undefined)
  const dispatch = useAppDispatch()

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed)
  }

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const validatePasswordConfirmation = () => {
    const { password, passwordConfirmation } = getValues()

    return passwordConfirmation === password || 'Passwords do not match'
  }

  const isUsernameValid = () => {
    const { username } = getValues()

    return (
      !(users && users.some((user) => user.name === username)) ||
      'User with this username is already registered'
    )
  }

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    signUpData({
      login: data.username,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        dispatch(
          setIsShowEmailSentModal({
            message: `We have sent a link to confirm your email to ${data.email}`,
            title: 'Email sent',
          }),
        )
      })
      .finally(() => {
        reset()
      })
    console.log(data)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.wrapper}>
        <Input
          type="default"
          label={'Username'}
          placeholder={'Epam11'}
          {...register('username', {
            required: 'Please enter your name',
            maxLength: {
              value: 30,
              message: 'Maximum number of characters 30',
            },
            minLength: {
              value: 6,
              message: 'Minimum number of characters 6',
            },
            validate: isUsernameValid,
          })}
        />
        {errors.username && (
          <span className={s.errorMessage}>{errors.username.message}</span>
        )}
      </div>
      <div className={s.wrapper}>
        <Input
          type="email"
          label={'Email'}
          placeholder={'Epam@epam.com'}
          {...register('email', {
            required: 'Please enter your email',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'The email must match the format \nexample@example.com',
            },
          })}
        />
        {errors.email && (
          <div
            className={`${errors.email.message === 'The email must match the format \nexample@example.com' ? s.errorWrapper : ''}`}
          >
            <span
              className={`${s.errorMessage} ${errors.email.message === 'The email must match the format \nexample@example.com' ? s.additionalErrorStyle : ''}`}
            >
              {errors.email.message}
            </span>
          </div>
        )}
      </div>
      <div className={s.wrapper}>
        <Input
          variant={'password'}
          label={'Password'}
          placeholder={'****************'}
          {...register('password', {
            required: 'Minimum number of characters 6',
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
        <Input
          variant={'password'}
          label={'Password confirmation'}
          placeholder={'****************'}
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
          onCheckedChange={handleCheckboxChange}
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

      <Button variant={'default'} type={'submit'} disabled={!isAgreed}>
        Sign Up
      </Button>
    </form>
  )
}
