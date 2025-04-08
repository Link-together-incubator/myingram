'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { RefObject, useEffect, useRef, useState } from 'react'

import { useUserProfileQuery } from '@/entities/user/api/userApi'
import { useAuthMeData } from '@/features/auth/api/lib/useAuthMeData'
import useScroll from '@/shared/lib/hooks/useScroll'
import { Button } from '@/shared/ui'

import s from './profile.module.scss'

type Posts = {
  items: Post[]
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
}

type Post = {
  id: string
  userId: string
  description: string
  photoUrls: string[]
  createdAt: string
  updatedAt: string
  photoUploadStatus: string
}

export default function Profile() {
  const user = useAuthMeData()
  const { id } = useParams<{ id: string }>()
  const { data } = useUserProfileQuery(id)

  const isCurrentUser = user?.id === id

  const [posts, setPosts] = useState<Posts[]>([])
  const [page, setPage] = useState(1)
  const limit = 8
  const childRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)
  const intersected = useScroll(parentRef, childRef, () =>
    fetchPosts(page, limit),
  )

  function fetchPosts(page: number, limit: number) {
    fetch(
      `https://gateway.myin-gram.ru/api/v1/posts?page=${page}&pageSize=${limit}&userId=${id}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setPosts((prev) => [...prev, ...json])
        setPage((prev) => prev + 1)
      })
  }

  useEffect(() => {
    fetchPosts(page, limit)
  }, [])
  //TODO: нужен запрос на получение данных о пользователе по id
  // const user = useAuthMeData()
  //

  // const isCurrentUser = user?.id === id
  // const isFriend = user?.friends?.includes(id)

  // if (!userData) {
  //   return <div>User not found</div>
  // }

  return (
    <div className={s.profileBlock}>
      <div className={s.profileHeader}>
        {data?.photoUrl ? (
          <Image src={data.photoUrl} alt={''} width={234} height={228} />
        ) : (
          <Image
            src={'/assets/images/avatarPhoto.webp'}
            alt={''}
            width={204}
            height={204}
          />
        )}
        <div className={s.infoBlock}>
          <div className={s.profileAndButtonGroup}>
            <div className={s.profileNameAndPaidGroup}>
              <h1 className={s.userName}>{data?.userName}</h1>
              {data?.paymentAccont ? (
                <Image
                  src={'/assets/svg/Paid.png'}
                  alt={''}
                  width={24}
                  height={24}
                />
              ) : (
                <></>
              )}
            </div>
            <div className={s.buttonGroup}>
              {isCurrentUser ? (
                <Button variant={'default'}>Profile Settings</Button>
              ) : user?.email ? (
                <>
                  {data?.followed ? (
                    <>
                      <Button variant={'default'}>Unfollow</Button>
                      <Button variant={'secondary'}>Send Message</Button>
                    </>
                  ) : (
                    <>
                      <Button variant={'default'}>Follow</Button>
                      <Button variant={'secondary'}>Send Message</Button>
                    </>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div className={s.followersBlock}>
            <div>
              <span>{data?.subscriptions}</span>
              <span>Following</span>
            </div>
            <div>
              <span>{data?.subscribers}</span>
              <span>Followers</span>
            </div>
            <div>
              <span>{posts.totalCount}</span>
              <span>Publications</span>
            </div>
          </div>
          <p className={s.textBlock}>{data?.aboutMe}</p>
        </div>
      </div>

      <div className={s.posts}>
        {/* TODO: сделать посты */}
        {posts.map((post) => (
          <div className={s.imageContainer} key={post.id} ref={parentRef}>
            <Image src={post.photoUrls[0]} alt={''} width={234} height={228} />
          </div>
        ))}
        <div ref={childRef} style={{ overflow: 'hidden' }}></div>
      </div>
    </div>
  )
}
