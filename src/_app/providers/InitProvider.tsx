'use client'

import { ReactNode, useEffect } from 'react'

import { useAppStart } from '@/_app/lib/useAppStart'
import { useLoginGoogleMutation } from '@/entities/user/api/userApi'
import { Loader } from '@/shared/ui'

export const InitProvider = ({ children }: { children: ReactNode }) => {
  const isInitialLoad = useAppStart()
  const [googleLogin] = useLoginGoogleMutation()
  useEffect(() => {
    // Извлекаем хеш из URL (часть после #)
    const hash = window.location.hash.substring(1) // Удаляем # в начале

    const params = new URLSearchParams(hash)
    const idToken = params.get('id_token') // Получаем JWT

    if (idToken) {
      googleLogin({ token: idToken })
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location.search,
      )
    }
  }, [])

  if (isInitialLoad) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return children
}
