'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useVerifyEmailQuery } from '@/entities/user/api/userApi'
import { ROUTES } from '@/shared/constants/routes'
import { withToken, WithTokenProps } from '@/shared/lib/hocs/withToken'

import s from './ConfirmEmail.module.scss'

type ConfirmEmailProps = WithTokenProps

const ConfirmEmail = ({ token = '' }: ConfirmEmailProps) => {
  const { error, isLoading } = useVerifyEmailQuery(token)
  const router = useRouter()

  useEffect(() => {
    if (error) {
      router.push(ROUTES.LINK_EXPIRED)
    }
  }, [error])

  if (isLoading) {
    return <p>Loading...</p> // todo: сделать адекватный лоадер
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.congratulations}>Congratulations!</h1>
      <p className={s.text}>Your email has been confirmed</p>
      <Link href="/sign-in" className={s.signInLink}>
        Sign In
      </Link>
      <Image
        src="/assets/images/congratulations.png"
        width={432}
        height={300}
        alt="hi"
      />
    </div>
  )
}

export default withToken(ConfirmEmail)
