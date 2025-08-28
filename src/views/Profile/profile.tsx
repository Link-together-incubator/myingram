'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { postApi, useGetPostsQuery } from '@/entities/post/api/postApi'
import { GetPostsPayload } from '@/entities/post/post.types'
import {
  profileApi,
  useGetUserProfileQuery,
} from '@/entities/profile/api/profileApi'
import { UserResponse } from '@/entities/user/api/user.types'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import {
  useGetSubscriptionsQuery,
  useUnsubscribeMutation,
} from '@/features/Payments/api/apiPayments'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { useScroll } from '@/shared/lib/hooks/useScroll'
import { Button } from '@/shared/ui'

import s from './profile.module.scss'
const LIMIT = 8
interface ProfileInitProps {
  serverPostsData: GetPostsPayload
  serverProfile: UserResponse
}

export default function Profile({
  serverPostsData,
  serverProfile,
}: ProfileInitProps) {
  const { data: user } = useAuthMeQuery()
  const isCurrentUser = user?.id === serverProfile.userId
  const [page, setPage] = useState(1)
  const router = useRouter()

  const handleProfileSettingsRoute = () => {
    router.push('/settings')
  }

  const childRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)

  const [initialized, setInitialized] = useState(false)
  const dispatch = useAppDispatch()

  const { data: clientProfile } = useGetUserProfileQuery(serverProfile.id, {
    skip: !initialized,
  })

  const { data: subscriptions } = useGetSubscriptionsQuery(undefined)
  const [unSubscribe] = useUnsubscribeMutation()
  const { data: postData } = useGetPostsQuery(
    {
      pageNumber: page,
      pageSize: LIMIT,
      userId: serverProfile.userId,
    },
    {
      skip: !initialized,
    },
  )
  const profile = initialized ? clientProfile || serverProfile : serverProfile
  const posts = initialized
    ? postData?.items || serverPostsData.items
    : serverPostsData.items

  const postsCount = initialized
    ? postData?.totalCount || serverPostsData.totalCount
    : serverPostsData.totalCount

  function isLastDayOfSubscription(subscriptionEndDate: string) {
    const today = new Date()
    const endDate = new Date(subscriptionEndDate)
    return (
      today.toISOString().split('T')[0] === endDate.toISOString().split('T')[0]
    )
  }

  useEffect(() => {
    const autoRenewalEnabled =
      localStorage.getItem('autoRenewalEnabled') ?? 'false'

    const subscriptionEndDate = subscriptions?.items[0]?.expiresAt
    if (subscriptionEndDate && isLastDayOfSubscription(subscriptionEndDate)) {
      if (!JSON.parse(autoRenewalEnabled)) {
        unSubscribe({ paymentId: subscriptions.items[0].id })
      }
    }
  }, [subscriptions])

  useEffect(() => {
    dispatch(
      postApi.util.upsertQueryData(
        'getPosts',
        { pageNumber: 1, pageSize: LIMIT, userId: serverProfile.userId },
        serverPostsData,
      ),
    )

    dispatch(
      profileApi.util.upsertQueryData(
        'getUserProfile',
        serverProfile.id,
        serverProfile,
      ),
    )

    setInitialized(true)
  }, [dispatch, serverPostsData, serverProfile])

  const handleNextPage = useCallback(() => {
    if (postData && page <= postData?.pagesCount) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [postData])

  useScroll(parentRef, childRef, handleNextPage)

  const { openPostModal } = usePostModal()
  const isFakePhoto = profile?.photoUrl?.includes('empty.jpg')
  const avatarSrc =
    !profile?.photoUrl || isFakePhoto
      ? '/assets/images/avatarPhoto.webp'
      : profile.photoUrl

  return (
    <div className={s.profileBlock}>
      <div className={s.profileHeader}>
        <Image
          src={avatarSrc}
          alt="User avatar"
          width={234}
          height={228}
          unoptimized
        />

        <div className={s.infoBlock}>
          <div className={s.profileAndButtonGroup}>
            <div className={s.profileNameAndPaidGroup}>
              <h1 className={s.userName}>{profile?.userName}</h1>
              {profile?.paymentAccount ? (
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
                <Button
                  onClick={handleProfileSettingsRoute}
                  variant={'default'}
                >
                  Profile Settings
                </Button>
              ) : user?.email ? (
                <>
                  {profile?.followed ? (
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
              <span>{profile?.subscriptions}</span>
              <span>Following</span>
            </div>
            <div>
              <span>{profile?.subscribers}</span>
              <span>Followers</span>
            </div>
            <div>
              <span>{postsCount}</span>
              <span>Publications</span>
            </div>
          </div>
          <p className={s.textBlock}>{profile?.aboutMe}</p>
        </div>
      </div>

      <div ref={parentRef} className={s.posts}>
        {posts.map((post) => (
          <div className={s.imageContainer} key={post.id}>
            <Image
              src={post.urls[0]?.fileUrl || ''}
              alt={post.description || 'Post image'}
              width={234}
              height={228}
              onClick={openPostModal.bind(null, post.id)}
            />
          </div>
        ))}
      </div>
      <div ref={childRef}></div>
    </div>
  )
}
