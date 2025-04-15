'use client'

import { useEffect } from 'react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { setAppAlert } from '@/shared/model/appSlice'
import { Alert } from '@/shared/model/appSlice.types'

type AppAlertClientProps = NonNullable<Alert>

export const AppAlertClient = ({ message, type }: AppAlertClientProps) => {
  const dispatch = useAppDispatch()
  const { closePostModal } = usePostModal()

  useEffect(() => {
    closePostModal()
    dispatch(setAppAlert({ message, type }))
  }, [])

  return null
}
