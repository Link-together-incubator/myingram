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
  }, [])

  useEffect(() => {
    const captchaContainer = document.getElementById('captcha_container')

    // Проверяем, существует ли grecaptcha и не была ли уже отрендерена капча
    if (
      window.grecaptcha &&
      captchaContainer &&
      !captchaContainer.querySelector('iframe')
    ) {
      window.grecaptcha.render('captcha_container', {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        theme: 'dark',
        callback: handleRecaptchaSuccess,
      })
    }
  }, [])

  return (
    <div
      className={`${cls.container} ${isShowRequiredMessage ? cls.requiredMessage : ''}`}
      id="captcha_container"
    >
      {isShowRequiredMessage && (
        <p className={cls.text}>Please verify that you are not a robot</p>
      )}
    </div>
  )
}
