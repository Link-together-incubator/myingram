'use client'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

import s from './PostHeader.module.scss'

type PostHeaderProps = {
  username: string
  onToggleMenu: () => void
  showMenu: boolean
  children?: React.ReactNode
}

export function PostHeader({
  username,
  onToggleMenu,
  showMenu,
  children,
}: PostHeaderProps) {
  return (
    <div className={s.header}>
      <div className={s.userInfo}>
        <Image
          src="/assets/images/ava.png"
          alt="avatar"
          width={36}
          height={36}
          className={s.avatar}
        />
        <span className={s.username}>{username}</span>
      </div>

      <div className={s.icons}>
        <button onClick={onToggleMenu}>
          <MoreHorizontal size={24} className={s.dotsHorizontal} />
        </button>
        {showMenu && children}
      </div>
    </div>
  )
}
