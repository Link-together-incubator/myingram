'use client'

import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

import { useAuthMeData } from '../../../entities/user/lib/useAuthMeData'

export const withSignInRedirect = <P extends object>(
  Component: ComponentType<P>,
) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter()
    const user = useAuthMeData()

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
