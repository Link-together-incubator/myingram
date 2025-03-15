'use client'

import { ReactNode, useEffect } from 'react'

import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { selectShowEmailSentModal } from '@/shared/model/appSlice'
import { Alert, AlertType } from '@/widgets/Alert'
import { SuccessEmailSent } from '@/widgets/SuccessEmailSent'

type ModalProviderProps = {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const emailMessage = useAppSelector(selectShowEmailSentModal)
  const message = {
    text: 'Your settings are saved',
    type: 'success' as AlertType,
  } // useSelector достаю из стейта состояние message

  const closeAlertCallback = () => {
    // dispatch({text: null, type: "classic"})
    console.log('clicked')
  }

  useEffect(() => {
    if (message.text === null) return

    const timeoutId = setTimeout(closeAlertCallback, 5000)

    return () => {
      // модалка размонтируется только при закрытии прилки
      clearInterval(timeoutId)
    }
  }, [message.text])

  return (
    <>
      {message.text && (
        <Alert
          cancelCallback={closeAlertCallback}
          text={message.text}
          type={message.type}
        />
      )}
      {emailMessage && (
        <SuccessEmailSent
          message={emailMessage.message}
          title={emailMessage.title}
        />
      )}
      {children}
    </>
  )
}
