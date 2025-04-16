import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { LoginPayload } from '@/features/autht/api/auth.types'
import { useRegisterUserMutation } from '@/features/autht/api/authApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setIsShowEmailSentModal } from '@/shared/model/appSlice'

export const useSignUpForm = () => {
  const [isAgreed, setIsAgreed] = useState(false)
  const [registerUser] = useRegisterUserMutation()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const validatePasswordConfirmation = (value: string) => {
    const { password } = getValues()
    return value === password || 'Passwords do not match'
  }

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    try {
      await registerUser({
        login: data.username,
        email: data.email,
        password: data.password,
      }).unwrap()

      dispatch(
        setIsShowEmailSentModal({
          title: 'Email sent',
          message: `We have sent a link to confirm your email to ${data.email}`,
        }),
      )

      reset()
    } catch (error) {
      console.log('Registration failed:', error)
    }
  }

  return {
    isAgreed,
    setIsAgreed,
    register,
    handleSubmit,
    errors,
    onSubmit,
    validatePasswordConfirmation,
    isValid,
  }
}
