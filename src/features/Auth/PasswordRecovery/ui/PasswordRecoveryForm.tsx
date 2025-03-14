'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRecoveryPasswordMutation } from '@/entities/user/api/userApi'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { EMAIL_REGEX } from '@/shared/lib/validators'
import { setIsShowEmailSentModal } from '@/shared/model/appSlice'
import { Button, Input, RecaptchaForm } from '@/shared/ui'

import cls from './PasswordRecoveryForm.module.scss'

type FormData = {
  email: string
}

export function PasswordRecoveryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [isShowRequiredMessage, setIsShowRequiredMessage] =
    useState<boolean>(false)

  const dispatch = useAppDispatch()

  const [recoveryPassword, { isLoading }] = useRecoveryPasswordMutation()

  const onSubmit = (data: FormData) => {
    let recaptchaResponse = null
    if (typeof window.grecaptcha !== 'undefined') {
      // Получаем токен reCAPTCHA
      recaptchaResponse = window.grecaptcha.getResponse()
    }

    if (!recaptchaResponse) {
      setIsShowRequiredMessage(true)
      return
    }

    // запрос
    recoveryPassword({
      email: data.email,
      recaptchaToken: recaptchaResponse,
    }).then(() => {
      dispatch(
        setIsShowEmailSentModal({
          message: 'We have sent a link to reset your password',
          title: 'Email sent',
        }),
      )
    })
  }

  return (
    <form className={cls.container} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cls.title}>Forgot Password</h2>
      <div className={cls.inputContainer}>
        <Input
          autoComplete="email"
          type="email"
          error={errors.email ? errors.email.message : null}
          className={cls.input}
          variant="email"
          {...register('email', {
            required: 'Email is required', // Обязательное поле
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email address', // Валидация email
            },
          })}
        />

        <p className={cls.description}>
          Enter your email address and we will send you further instructions
        </p>
      </div>
      <Button
        disabled={!!errors.email || isShowRequiredMessage || isLoading}
        className={cls.btn}
        variant={'default'}
      >
        Send Link
      </Button>
      <Button href="/sign-in" className={cls.btn} variant={'link'}>
        Back to Sign In
      </Button>
      <RecaptchaForm
        isShowRequiredMessage={isShowRequiredMessage}
        setIsShowRequiredMessage={setIsShowRequiredMessage}
      />
    </form>
  )
}
