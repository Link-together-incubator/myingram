'use client'

import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { useVerifyResendMutation } from '@/entities/user/api/userApi'
import { VerificationPayload } from '@/entities/user/user.types'
import { EMAIL_REGEX } from '@/shared/constants/validators'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setIsShowEmailSentModal } from '@/shared/model/appSlice'
import { Button, Input } from '@/shared/ui'

import s from './LinkExpired.module.scss'

export function LinkExpired() {
  const [verifyResend, { isLoading }] = useVerifyResendMutation()
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
      .unwrap()
      .then(() => {
        dispatch(
          setIsShowEmailSentModal({
            message:
              'We have sent a link to confirm your email to epam@epam.com',
            title: 'Email sent',
          }),
        )
        reset()
      })
      .catch((err) => {
        console.log('Resend failed:', err)
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
          error={errors.email?.message}
          {...register('email', {
            required: 'Please enter your email',
            pattern: {
              value: EMAIL_REGEX,
              message: 'The email must match the format\nexample@example.com',
            },
          })}
        />
        <Button disabled={isLoading} variant={'default'} type={'submit'}>
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
