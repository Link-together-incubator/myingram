'use client'

import { ReactNode } from 'react'

import { useAppStart } from '@/_app/lib/useAppStart'
import { Loader } from '@/shared/ui'

export const InitProvider = ({ children }: { children: ReactNode }) => {
  const isInitialLoad = useAppStart()

  if (isInitialLoad) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return children
}
