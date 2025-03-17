'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useResetPasswordMutation } from '@/entities/user/api/userApi'
import { withToken, WithTokenProps } from '@/shared/lib/hocs/withToken'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setIsShowEmailSentModal } from '@/shared/model/appSlice'
import { Button, Input } from '@/shared/ui'

import cls from './ResetPasswordForm.module.scss'

type PasswordFormInputs = {
  newPassword: string
  confirmPassword: string
}

type ResetPasswordFormProps = WithTokenProps

function ResetPasswordForm({ token = '' }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormInputs>()

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const dispatch = useAppDispatch()

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
        error={errors.newPassword?.message}
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
        error={errors.confirmPassword?.message}
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

export default withToken(ResetPasswordForm)
