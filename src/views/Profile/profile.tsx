'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'

import { PostResponse } from '@/entities/post/post.types'
import { useUserProfileQuery } from '@/entities/user/api/userApi'
import { useAuthMeData } from '@/features/auth/api/lib/useAuthMeData'
import useScroll from '@/shared/lib/hooks/useScroll'
import { Button } from '@/shared/ui'

import s from './profile.module.scss'

export default function Profile() {
  const user = useAuthMeData()
  const { id } = useParams<{ id: string }>()
  const { data } = useUserProfileQuery(id)

  const isCurrentUser = user?.id === id

  const [posts, setPosts] = useState<PostResponse[]>([])
  const [postsCount, setPostsCount] = useState(0)
  const [page, setPage] = useState(1)

  const limit = 8
  const childRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)
  const intersected = useScroll(parentRef, childRef, () =>
    fetchPosts(page, limit),
  )
  console.log(intersected)

  function fetchPosts(page: number, limit: number) {
    fetch(
      `https://gateway.myin-gram.ru/api/v1/posts?pageNumber=${page}&pageSize=${limit}&userId=${id}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setPage((prev) => prev + 1)
        setPosts((prev) => [...prev, ...json.items])
        setPostsCount(json.totalCount)
      })
  }

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
              {data?.paymentAccount ? (
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
              <span>{postsCount}</span>
              <span>Publications</span>
            </div>
          </div>
          <p className={s.textBlock}>{data?.aboutMe}</p>
        </div>
      </div>

      <div ref={parentRef} className={s.posts}>
        {posts.map((post) => (
          <div className={s.imageContainer} key={post.id}>
            <Image src={post.photoUrls[0]} alt={''} width={234} height={228} />
          </div>
        ))}
      </div>
      <div ref={childRef}></div>
    </div>
  )
}
