'use client'
import Link from 'next/link'

import { useAuthMeData } from '@/entities/user/lib/useAuthMeData'

const TEST_POST_ID = 'c3e8fcec-133f-45fb-b90e-8a47d049d0e2'

export default function Home() {
  const user = useAuthMeData()

  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px] text-3xl text-amber-100`}
    >
      Привет! Твой логин - {user?.name} и ты {user?.isConfirmed || 'не '}
      подтвердил почту
      <Link href={`/post/${TEST_POST_ID}`} scroll={false}>
        <div className="mockPostCard">Post Card</div>
      </Link>
      <div className="h-[1000px]"></div>
    </div>
  )
}
