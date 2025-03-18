'use client'

import { ArrowLeft } from 'lucide-react'

import { ROUTES } from '@/shared/constants/routes'

import { Button } from '../Button/Button'

import s from './Info.module.scss'

type InfoProps = {
  title: string
  children: string
}

export function Info({ children, title }: InfoProps) {
  return (
    <>
      <div className="w-full px-32">
        <Button isA href={ROUTES.SIGN_UP} variant={'date'}>
          <ArrowLeft />
          Back to Sign Up
        </Button>
      </div>{' '}
      <div className={s.wrapper}>
        <h1 className={s.main}>{title}</h1>
        <p className={s.text}>{children}</p>
      </div>
    </>
  )
}
