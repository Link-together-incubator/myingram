'use client'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

import s from './PostHeader.module.scss'

type PostHeaderProps = {
  username: string | React.ReactNode
  onToggleMenu: () => void
  showMenu: boolean
  children?: React.ReactNode
  profileImage: string
}

export function PostHeader({
  username,
  onToggleMenu,
  showMenu,
  children,
  profileImage,
}: PostHeaderProps) {
  return (
    <div className={s.header}>
      <div className={s.userInfo}>
        {profileImage ? (
          <Image
            src={profileImage}
            alt="avatar"
            width={36}
            height={36}
            className={s.avatar}
          />
        ) : (
          <div className={s.defaultAvatar} />
        )}
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
