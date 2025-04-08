'use client'

import { BellRing } from 'lucide-react'
import Link from 'next/link'

import { useAuthMeData } from '@/features/auth/api/lib/useAuthMeData'
import { ROUTES } from '@/shared/constants/routes'
import { Button } from '@/shared/ui'

import s from './Header.module.scss'

export function Header() {
  const user = useAuthMeData()

  return (
    <header className={s.header}>
      <div className={s['header-container']}>
        <Link
          href={user ? ROUTES.HOME : ROUTES.SIGN_IN}
          className={s['header-container-title']}
        >
          Inctagram
        </Link>
        {user ? (
          <div className={s['header-container-btns']}>
            <BellRing className="cursor-pointer" />
            <select name="language" id="1">
              <option value="english">English</option>
              <option value="russian">Russian</option>
            </select>
          </div>
        ) : (
          <div className={s['header-container-btns']}>
            <select name="language" id="1">
              <option value="english">English</option>
              <option value="russian">Russian</option>
            </select>
            <Button href={ROUTES.SIGN_IN} variant={'link'}>
              Sign in
            </Button>
            <Button isA href={ROUTES.SIGN_UP} variant={'default'}>
              Sign up
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
