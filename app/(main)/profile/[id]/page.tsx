'use client'

import { useRouter } from 'next/router'

import Profile from '@/views/Profile/profile'

export default function ProfilePage() {
  // const router = useRouter()
  // const { id } = router.query
  // console.log('id =', id)
  // console.log(router.query, 'query')

  return <Profile />
}
