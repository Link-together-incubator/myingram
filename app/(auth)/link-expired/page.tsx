'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { useVerifyResendMutation } from '@/entities/user/api/userApi'
import { VerificationPayload } from '@/features/auth/api/signUp/VerificationLinkArgs.types'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { setIsShowEmailSentModal } from '@/shared/model/appSlice'
import { Button, Input } from '@/shared/ui'

import s from './page.module.scss'

export default function LinkExpired() {
  const [verifyResend] = useVerifyResendMutation()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VerificationPayload>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: VerificationPayload) => {
    verifyResend(data)
      .then(() => {
        dispatch(
          setIsShowEmailSentModal({
            message:
              'We have sent a link to confirm your email to epam@epam.com',
            title: 'Email sent',
          }),
        )
      })
      .finally(() => {
        reset()
      })
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.main}>Email verification link expired</h1>
      <p className={s.text}>
        Looks like the verification link has expired. Not to worry, we can send
        the link again
      </p>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          variant={'email'}
          {...register('email', {
            required: 'Please enter your email',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'The email must match the format \nexample@example.com',
            },
          })}
        />
        {errors.email && (
          <span className={s.error}>{errors.email.message}</span>
        )}
        <Button variant={'default'} type={'submit'}>
          Resend verification link
        </Button>
      </form>
      <Image
        src="/assets/images/link-expired.png"
        alt={'hi'}
        width={473}
        height={353}
      />
    </div>
  )
}
