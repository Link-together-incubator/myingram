'use client'

import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

import { useAuthMeQuery } from '@/entities/user/api/userApi'
import { ROUTES } from '@/shared/constants/routes'

export const withMainRedirect = <P extends object>(
  Component: ComponentType<P>,
) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter()
    const { data } = useAuthMeQuery(undefined, { skip: true })

    useEffect(() => {
      if (data?.email) {
        router.replace(ROUTES.HOME)
      }
    }, [data?.email])

    if (data?.email) return null

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withToken(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}
