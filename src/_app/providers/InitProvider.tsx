'use client'

import { ReactNode } from 'react'

import { useAuthMeQuery } from '@/entities/user/api/userApi'
import { Loader } from '@/shared/ui'

export const InitProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useAuthMeQuery()

  if (!data && isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return children
}
