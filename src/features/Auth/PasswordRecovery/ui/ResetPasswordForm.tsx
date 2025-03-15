'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useResetPasswordMutation } from '@/entities/user/api/userApi'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { setIsShowEmailSentModal } from '@/shared/model/appSlice'
import { Button, Input } from '@/shared/ui'

import cls from './ResetPasswordForm.module.scss'

interface PasswordFormInputs {
  newPassword: string
  confirmPassword: string
}

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormInputs>()

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const params = useSearchParams()
  const token = params.get('code') ?? ''
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token === '') {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<PasswordFormInputs> = (data) => {
    resetPassword({ password: data.newPassword, recoveryCode: token }).then(
      () => {
        dispatch(
          setIsShowEmailSentModal({
            message: 'Your password has been successfully changed',
            title: 'Password was changed',
          }),
        )
      },
    )
  }

  const newPassword = watch('newPassword')

  return (
    <form className={cls.container} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={cls.title}>Create New Password</h2>
      <Input
        variant="password"
        label="New password"
        autoComplete="new-password"
        className={cls.inputs}
        error={errors.newPassword ? errors.newPassword.message : null}
        {...register('newPassword', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
          maxLength: {
            value: 20,
            message: 'Password must be at most 20 characters',
          },
        })}
      />
      <Input
        variant="password"
        label="Password confirmation"
        autoComplete="new-password"
        className={cls.inputs}
        error={errors.confirmPassword ? errors.confirmPassword.message : null}
        {...register('confirmPassword', {
          required: 'Password confirmation is required',
          validate: (value) =>
            value === newPassword || 'The passwords must match',
        })}
      />
      <p className={cls.description}>
        Your password must be between 6 and 20 characters
      </p>

      <Button
        disabled={!!errors.confirmPassword || !!errors.newPassword || isLoading}
        variant={'default'}
        type="submit"
        className={cls.btn}
      >
        Create new password
      </Button>
    </form>
  )
}
