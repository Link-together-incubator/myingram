'use client'

import { ComponentType, useEffect } from 'react'

import { useAuthMeQuery } from '@/features/auth/api/authApi'

export const withSignInRedirect = <P extends object>(
  Component: ComponentType<P>,
) => {
  const WrappedComponent = (props: P) => {
    const { data: user } = useAuthMeQuery()

    useEffect(() => {
      if (!user?.email) {
        // router.replace(ROUTES.SIGN_IN)
      }
    }, [user?.email])

    // if (!user?.email) return null

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withToken(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}
