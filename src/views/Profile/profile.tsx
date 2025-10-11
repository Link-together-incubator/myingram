'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useGetPostsQuery } from '@/entities/post/api/postApi'
import { GetPostsResponse } from '@/entities/post/post.types'
import { useGetUserProfileQuery } from '@/entities/profile/api/profileApi'
import { UserResponse } from '@/entities/user/api/user.types'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import {
  useGetSubscriptionsQuery,
  useUnsubscribeMutation,
} from '@/features/Payments/api/apiPayments'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { useScroll } from '@/shared/lib/hooks/useScroll'
import { Button } from '@/shared/ui'

import s from './profile.module.scss'

const LIMIT = 8

type ProfileProps = {
  serverPostsData: GetPostsResponse
  serverProfile: UserResponse
}

export default function Profile({
  serverPostsData,
  serverProfile,
}: ProfileProps) {
  const router = useRouter()
  const [page, setPage] = useState(1)

  const parentRef = useRef<HTMLDivElement | null>(null)
  const childRef = useRef<HTMLDivElement | null>(null)

  const { data: user } = useAuthMeQuery()
  const isCurrentUser = user?.id === serverProfile.userId

  const { data: clientProfile } = useGetUserProfileQuery(serverProfile.userId)
  const { data: subscriptions } = useGetSubscriptionsQuery()
  const [unSubscribe] = useUnsubscribeMutation()

  const { data: postData } = useGetPostsQuery({
    pageNumber: page,
    pageSize: LIMIT,
    userId: serverProfile.userId,
  })

  const profile = clientProfile ?? serverProfile
  const posts = postData?.items ?? serverPostsData.items
  const postsCount = postData?.totalCount ?? serverPostsData.totalCount

  const { openPostModal } = usePostModal()

  const avatarSrc =
    profile?.photoUrl?.includes('empty.jpg') || !profile?.photoUrl
      ? '/assets/images/avatarPhoto.webp'
      : profile.photoUrl

  const isLastDayOfSubscription = (date: string) => {
    const today = new Date().toISOString().split('T')[0]
    const end = new Date(date).toISOString().split('T')[0]
    return today === end
  }

  const handleNextPage = useCallback(() => {
    const total = postData?.totalCount ?? 0
    if (page <= total / LIMIT) {
      setPage((prev) => prev + 1)
    }
  }, [postData])

  const handleProfileSettingsRoute = () => {
    router.push('/settings')
  }

  useEffect(() => {
    const subscription = subscriptions?.items?.[0]
    if (!subscription) return

    const autoRenewalEnabled =
      localStorage.getItem('autoRenewalEnabled') ?? 'false'
    const subscriptionEndDate = subscription.expiresAt

    if (subscriptionEndDate && isLastDayOfSubscription(subscriptionEndDate)) {
      if (!JSON.parse(autoRenewalEnabled)) {
        unSubscribe({ paymentId: subscription.id })
      }
    }
  }, [subscriptions, unSubscribe])

  useScroll(parentRef, childRef, handleNextPage)

  return (
    <div className={s.profileBlock}>
      <div className={s.profileHeader}>
        <Image
          src={avatarSrc}
          alt="User avatar"
          width={234}
          height={228}
          className={s.avatarImage}
        />

        <div className={s.infoBlock}>
          <div className={s.profileAndButtonGroup}>
            <div className={s.profileNameAndPaidGroup}>
              <h1 className={s.userName}>{profile?.userName ?? 'Anonymous'}</h1>
              {profile?.paymentAccount && (
                <Image
                  src="/assets/svg/Paid.png"
                  alt="Paid"
                  width={24}
                  height={24}
                />
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
                      <Button variant="default">Unfollow</Button>
                      <Button variant="secondary">Send Message</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="default">Follow</Button>
                      <Button variant="secondary">Send Message</Button>
                    </>
                  )}
                </>
              ) : null}
            </div>
          </div>

          <div className={s.followersBlock}>
            <div>
              <span>{profile?.subscriptions ?? 0}</span>
              <span>Following</span>
            </div>
            <div>
              <span>{profile?.subscribers ?? 0}</span>
              <span>Followers</span>
            </div>
            <div>
              <span>{postsCount}</span>
              <span>Publications</span>
            </div>
          </div>

          <p className={s.textBlock}>
            {profile?.aboutMe ?? 'No description yet.'}
          </p>
        </div>
      </div>

      <div ref={parentRef} className={s.posts}>
        {posts.map((post) => {
          const imageUrl = post.urls?.[0]?.fileUrl ?? ''
          return (
            <div className={s.imageContainer} key={post.id}>
              <Image
                src={imageUrl}
                alt={post.title || 'Post image'}
                width={234}
                height={228}
                onClick={() => openPostModal(post.id)}
              />
            </div>
          )
        })}
      </div>

      <div ref={childRef}></div>
    </div>
  )
}
