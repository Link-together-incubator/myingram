'use client'

import Image from 'next/image'

import s from './UserInfo.module.scss'

type UserInfoProps = {
  username: string
  className?: string
}

export const UserInfo = ({ username, className }: UserInfoProps) => {
  return (
    <div className={`${s.userInfo} ${className ?? ''}`}>
      <Image
        src="/assets/images/ava.png"
        alt="avatar"
        width={36}
        height={36}
        className={s.avatar}
      />
      <span className={s.username}>{username}</span>
    </div>
  )
}
