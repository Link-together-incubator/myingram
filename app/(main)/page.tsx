'use client'

import { useAuthMeData } from '@/features/auth/api/lib/useAuthMeData'

export default function Home() {
  const user = useAuthMeData()

  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px] text-3xl text-amber-100`}
    >
      Привет! Твой логин - {user?.name} и ты {user?.isConfirmed || 'не '}
      подтвердил почту
    </div>
  )
}
