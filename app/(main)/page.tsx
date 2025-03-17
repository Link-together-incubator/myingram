'use client'

import { useAuthMeQuery } from '@/entities/user/api/userApi'

export default function Home() {
  const { data } = useAuthMeQuery(undefined, { skip: true })

  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px]`}
    >
      Привет! Твой логин - {data?.name} и ты {!data?.isConfirmed && 'не '}
      подтвердил почту
    </div>
  )
}
