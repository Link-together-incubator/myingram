'use client'

import clsx from 'clsx'
import { X } from 'lucide-react'
import { useEffect } from 'react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setAppAlert } from '@/shared/model/appSlice'

import cls from './Alert.module.scss'

export type AlertType = 'error' | 'success' | 'classic'

type AlertProps = {
  data: { message: string; type: AlertType }
}

const TIMEOUT_AUTOCLOSE_ALERT = 3000

export const Alert = ({ data: { message, type } }: AlertProps) => {
  const dispatch = useAppDispatch()

  const closeAlertCallback = () => {
    dispatch(setAppAlert(null))
  }

  useEffect(() => {
    const timeoutId = setTimeout(closeAlertCallback, TIMEOUT_AUTOCLOSE_ALERT)

    return () => {
      clearInterval(timeoutId)
    }
  }, [message])

  return (
    // Размонтирую с помощью key, чтобы заново сработала анимация
    <div key={message} className={clsx(cls.alert, cls[type])}>
      <span className={cls.alertMessage}>{message}</span>
      <X className={cls.btn} onClick={closeAlertCallback} />
    </div>
  )
}
