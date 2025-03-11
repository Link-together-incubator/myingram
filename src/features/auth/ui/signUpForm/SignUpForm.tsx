'use client'

import { useForm } from 'react-hook-form'

import { LoginArgs } from '@/features/auth/api/signUp/SignUpArgs.types'
import { Button, Checkbox, Input } from '@/shared/ui'

import s from './SignUpForm.module.scss'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({
    defaultValues: { username: '', email: '', password: '' },
  })

  return (
    <div>
      <form className={s.form}>
        <Input type="username" {...register('username', { required: true })} />
        <Input type="email" {...register('email', { required: true })} />
        <Input type="password" {...register('password', { required: true })} />
        <Input
          type="passwordConfirmation"
          {...register('password', { required: true })}
        />
        <Checkbox
          id={'agree'}
          label={'I agree to the Terms of Service and Privacy Policy'}
        />
        <Button variant={'default'} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  )
}
