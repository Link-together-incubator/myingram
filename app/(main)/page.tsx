'use client'
import Link from 'next/link'

import { useAuthMeData } from '@/entities/user/lib/useAuthMeData'

const TEST_POST_ID = '6280fd16-468d-4b71-9ad1-1c914702a75f'

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
    </div>
  )
}
