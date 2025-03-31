'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAuthMeQuery } from '@/entities/user/api/userApi'
import { ACCESS_TOKEN } from '@/shared/constants/const'

export const useAppStart = () => {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('accessToken')
  if (token && typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TOKEN, token)
    const newParams = new URLSearchParams(params.toString())
    newParams.delete('accessToken')
    router.replace(window.location.pathname)
  }
  const { data, error } = useAuthMeQuery()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    if (data || error) {
      setIsInitialLoad(false)
    }
  }, [data, error])

  return isInitialLoad
}
