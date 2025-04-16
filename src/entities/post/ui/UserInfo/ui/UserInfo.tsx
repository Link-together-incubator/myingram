'use client'

import Image from 'next/image'

import s from './UserInfo.module.scss'

type UserInfoProps = {
  username: string
  className?: string
  profileImage?: string
}

export const UserInfo = ({
  username,
  className,
  profileImage,
}: UserInfoProps) => {
  return (
    <div className={`${s.userInfo} ${className ?? ''}`}>
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
  )
}
