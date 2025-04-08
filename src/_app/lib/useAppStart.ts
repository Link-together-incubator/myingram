import { useEffect, useState } from 'react'

import { useAuthMeQuery } from '@/features/auth/api/authApi'

export const useAppStart = () => {
  const { data, error } = useAuthMeQuery()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    if (data || error) {
      setIsInitialLoad(false)
    }
  }, [data, error])

  return isInitialLoad
}
