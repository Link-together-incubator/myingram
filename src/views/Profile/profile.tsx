'use client'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { RefObject, useEffect, useRef, useState } from 'react'

import { useAuthMeData } from '@/entities/user/lib/useAuthMeData'
import useScroll from '@/shared/lib/hooks/useScroll'
import { Button } from '@/shared/ui'

import s from './profile.module.scss'

export default function Profile() {
  const myPosts = [
    {
      id: 1,
      title: 'Post 1',
      url: '/assets/images/post1.png',
    },
    {
      id: 2,
      title: 'Post 2',
      url: '/assets/images/post2.png',
    },
    {
      id: 3,
      title: 'Post 3',
      url: '/assets/images/post3.png',
    },
    {
      id: 4,
      title: 'Post 4',
      url: '/assets/images/post4.png',
    },
    {
      id: 5,
      title: 'Post 5',
      url: '/assets/images/post5.png',
    },
    {
      id: 6,
      title: 'Post 6',
      url: '/assets/images/post6.png',
    },
    {
      id: 7,
      title: 'Post 7',
      url: '/assets/images/post7.png',
    },
    {
      id: 8,
      title: 'Post 8',
      url: '/assets/images/post8.png',
    },
    {
      id: 1,
      title: 'Post 1',
      url: '/assets/images/post1.png',
    },
    {
      id: 2,
      title: 'Post 2',
      url: '/assets/images/post2.png',
    },
    {
      id: 3,
      title: 'Post 3',
      url: '/assets/images/post3.png',
    },
    {
      id: 4,
      title: 'Post 4',
      url: '/assets/images/post4.png',
    },
    {
      id: 5,
      title: 'Post 5',
      url: '/assets/images/post5.png',
    },
    {
      id: 6,
      title: 'Post 6',
      url: '/assets/images/post6.png',
    },
    {
      id: 7,
      title: 'Post 7',
      url: '/assets/images/post7.png',
    },
    {
      id: 8,
      title: 'Post 8',
      url: '/assets/images/post8.png',
    },
  ]

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const limit = 8
  const childRef = useRef<HTMLElement | null>(null)
  const parentRef = useRef<HTMLElement | null>(null)
  const intersected = useScroll(parentRef, childRef, () =>
    fetchPosts(page, limit),
  )

  function fetchPosts(page: number, limit: number) {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
    )
      .then((response) => response.json())
      .then((json) => setPosts(json))
  }

  useEffect(() => {
    fetchPosts(page, limit)
  }, [])
  //TODO: нужен запрос на получение данных о пользователе по id
  // const user = useAuthMeData()
  //
  // const router = useRouter()
  // const { id } = router.query

  // const isCurrentUser = user?.id === id
  // const isFriend = user?.friends?.includes(id)

  return (
    <div className={s.profileBlock}>
      <div className={s.profileHeader}>
        <Image
          src={'/assets/images/Mask group.png'}
          alt={''}
          width={234}
          height={228}
        />
        <div className={s.infoBlock}>
          <div className={s.profileAndButtonGroup}>
            <div className={s.profileNameAndPaidGroup}>
              <h1 className={s.userName}>URLProfile</h1>
              <Image
                src={'/assets/svg/Paid.png'}
                alt={''}
                width={24}
                height={24}
              />
            </div>
            <div className={s.buttonGroup}>
              <Button variant={'default'}>Profile Settings</Button>
            </div>
          </div>
          <div className={s.followersBlock}>
            <div>
              <span>2222</span>
              <span>Following</span>
            </div>
            <div>
              <span>232323</span>
              <span>Followers</span>
            </div>
            <div>
              <span>12345</span>
              <span>Publications</span>
            </div>
          </div>
          <p className={s.textBlock}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className={s.posts}>
        {/* TODO: сделать посты */}
        {myPosts.map((post) => (
          <div key={post.id} ref={parentRef}>
            <div className={s.imageContainer}>
              <Image src={post.url} alt={''} width={234} height={228} />
            </div>
            <div ref={childRef}></div>
          </div>
        ))}
      </div>
    </div>
  )
}
