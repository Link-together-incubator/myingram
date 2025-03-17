import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { useLoginUserMutation } from '@/entities/user/api/userApi'
import { setIsLoggedIn } from '@/entities/user/model/userSlice'
import { LoginArgs } from '@/entities/user/user.types'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { EMAIL_REGEX } from '@/shared/lib/validators'
import { Button, Card, Input } from '@/shared/ui'

import s from './SignInForm.module.scss'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginArgs>({
    defaultValues: { email: '', password: '' }, mode: 'onBlur', reValidateMode: 'onBlur'
  })
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const onSubmit = async (data: LoginArgs) => {
    try {
      const response = await loginUser(data).unwrap()
      sessionStorage.setItem('access-token', response.accessToken)
      dispatch(setIsLoggedIn(true))
      reset()
      router.push('/')
    } catch (err) {
      console.log('Login failed:', err)
    }
  }

  const cardId = useId()

  return (
    <Card className={s.card} title="Sign In" id={cardId}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.imageWrapper}>
          <Link href={'#google'}>
            <Image
              src="/assets/images/google.svg"
              width={36}
              height={36}
              alt="Google Icon"
            />
          </Link>
          <Link href={'#github'}>
            <Image
              src="/assets/images/github.svg"
              width={36}
              height={36}
              alt="Github Icon"
            />
          </Link>
        </div>
        <div className={s.inputWrapper}>
          <Input
            type="email"
            autoComplete="email"
            error={errors.email ? errors.email.message : null}
            variant="email"
            {...register('email', {
              required: 'Email is required', // Обязательное поле
              pattern: {
                value: EMAIL_REGEX,
                message: 'Invalid email address', // Валидация email
              },
            })}
          />
          <Input
            error={errors.password ? errors.password.message : null}
            variant="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required', // Обязательное поле
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must be at most 20 characters',
              },
              pattern: {
                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/,
                message: 'Password should contain letters, numbers and special characters',
              },
            })}
          />
        </div>
        <div className={s.buttonWrapper}>
          <div className={s.forgotPassword}>
            <Button variant={'link'} href="/password-recovery">
              Forgot Password
            </Button>
          </div>
          <Button
            variant="default"
            type="submit"
            disabled={!isValid || isLoading}
          >
            Sign In
          </Button>
          <div className={s.signUpWrapper}>
            <span>Don’t have an account?</span>
            <Button href="/sign-up" variant={'link'}>
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
