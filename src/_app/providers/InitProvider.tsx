'use client'

import { ReactNode, useEffect } from 'react'

import { useAppStart } from '@/_app/lib/useAppStart'
import { useLoginGoogleMutation } from '@/features/auth/api/authApi'

export const InitProvider = ({ children }: { children: ReactNode }) => {
  useAppStart()
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

  return children
}
