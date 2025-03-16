'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useVerifyEmailQuery } from '@/entities/user/api/userApi'
import { useAppSelector } from '@/shared/hooks/useAppSelector'

import s from './page.module.scss'

export default function Congratulations() {
  const error = useAppSelector((state) => state.app.error)
  // const router = useRouter()
  // const { token } = router.query // Получение значения параметра 'term'
  //
  const { data: tokenData } = useVerifyEmailQuery(token as string)

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
