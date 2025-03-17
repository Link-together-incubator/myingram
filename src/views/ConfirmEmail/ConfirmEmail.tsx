'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { useVerifyEmailQuery } from '@/entities/user/api/userApi'

import s from './ConfirmEmail.module.scss'

export function ConfirmEmail() {
  const router = useRouter()
  const params = useSearchParams()
  const tokenFromQuery = params.get('code')

  const { error, isLoading } = useVerifyEmailQuery(
    tokenFromQuery ? tokenFromQuery : '',
  )

  if (error) {
    router.push('./link-expired')
    return null
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.congratulations}>Congratulations!</h1>
      <p className={s.text}>Your email has been confirmed</p>
      <Link href="/sign-in" className={s.signInLink}>
        Sign In
      </Link>
      <Image src="/assets/images/bro.png" width={432} height={300} alt="hi" />
    </div>
  )
}
