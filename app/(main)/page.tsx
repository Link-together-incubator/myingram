'use client'

import { useModal } from '@/_app/providers/Modals/ModalProvider'
import { useAuthMeData } from '@/entities/user/lib/useAuthMeData'

const TEST_POST_ID = 'c5d7d804-b3b2-4ab4-9b21-49db1540075c'

export default function Home() {
  const user = useAuthMeData()
  const { openPostModal } = useModal()
  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px] text-3xl text-amber-100`}
    >
      Привет! Твой логин - {user?.name} и ты {user?.isConfirmed || 'не '}
      подтвердил почту
      <div className="mockPostCard" onClick={() => openPostModal(TEST_POST_ID)}>
        Post Card
      </div>
      <div className="h-[1000px]"></div>
    </div>
  )
}
