'use client'

import { useEffect } from 'react'

import cls from './RecaptchaForm.module.scss'

type RecaptchaFormProps = {
  isShowRequiredMessage?: boolean
  setIsShowRequiredMessage?: (value: boolean) => void
}

export const RecaptchaForm = ({
  isShowRequiredMessage = false,
  setIsShowRequiredMessage = () => {},
}: RecaptchaFormProps) => {
  // Если решили капчу - убираем error message
  const handleRecaptchaSuccess = () => {
    setIsShowRequiredMessage(false)
  }

  // Добавляем функцию в глобальную область видимости, чтобы reCAPTCHA могла её вызвать
  useEffect(() => {
    window.handleRecaptchaSuccess = handleRecaptchaSuccess
    return () => {
      delete window.handleRecaptchaSuccess
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`${cls.container} ${isShowRequiredMessage ? cls.requiredMessage : ''}`}
    >
      <div
        className="g-recaptcha"
        data-theme="dark"
        data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        data-callback="handleRecaptchaSuccess"
      ></div>
      {isShowRequiredMessage && (
        <p className={cls.text}>Please verify that you are not a robot</p>
      )}
    </div>
  )
}
