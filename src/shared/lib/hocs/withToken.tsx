'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

import { ROUTES } from '@/shared/constants/routes'

export type WithTokenProps = {
  token?: string
}

export const withToken = <P extends object>(Component: ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const params = useSearchParams()
    const token = params.get('token')

    const router = useRouter()

    useEffect(() => {
      if (!token) {
        router.replace(ROUTES.SIGN_IN)
      }
    }, [token, router])

    if (!token) return null

    return <Component {...props} token={token} /> // Прокидываем токен
  }

  WrappedComponent.displayName = `withToken(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}
