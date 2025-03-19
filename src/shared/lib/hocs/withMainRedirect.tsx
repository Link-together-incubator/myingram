'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

import { ROUTES } from '@/shared/constants/routes'

import { useAuthMeData } from '../../../entities/user/lib/useAuthMeData'

export const withMainRedirect = <P extends object>(
  Component: ComponentType<P>,
) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter()
    const user = useAuthMeData()
    const path = usePathname()

    useEffect(() => {
      // Если пользователь авторизован и находится на странице регистрации или входа
      if (user?.email && (path === ROUTES.SIGN_IN || path === ROUTES.SIGN_UP)) {
        router.replace(ROUTES.HOME) // Редирект на главную страницу
      }
    }, [user?.email, path, router])

    if (user?.email && (path === ROUTES.SIGN_IN || path === ROUTES.SIGN_UP)) {
      return null
    }

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withMainRedirect(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}
