import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Card, Input } from '@/shared/ui'

import s from './ SignIn.module.scss'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginArgs>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginArgs) => {
    console.log('Sign In Data:', data)
  }

  const cardId = useId()

  return (
    <Card
      className={s.card}
      title="Sign In"
      id={cardId}
      content={
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input type="email" {...register('email')} />
          </div>
          <div>
            <Input type="password" {...register('password')} />
          </div>
        </form>
      }
      footer={
        <Button variant="default" type="submit">
          Sign In
        </Button>
      }
    />
  )
}
