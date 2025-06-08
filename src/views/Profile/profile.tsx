'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { postApi, useGetPostsQuery } from '@/entities/post/api/postApi'
import { GetPostsPayload } from '@/entities/post/post.types'
import { UserResponse } from '@/entities/user/api/user.types'
import { userApi, useUserProfileQuery } from '@/entities/user/api/userApi'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { useScroll } from '@/shared/lib/hooks/useScroll'
import { Button } from '@/shared/ui'

import s from './profile.module.scss'
import { Settings } from '@/entities/profile/ui/settings/Settings'
const LIMIT = 8

interface ProfileInitProps {
  serverPostsData: GetPostsPayload
  serverProfile: UserResponse
}

export default function Profile({
  serverPostsData,
  serverProfile,
}: ProfileInitProps) {
  // const { data: user } = useAuthMeQuery()
  // const isCurrentUser = user?.id === serverProfile.userId
  // const [page, setPage] = useState(1)
  //
  // const childRef = useRef<HTMLDivElement | null>(null)
  // const parentRef = useRef<HTMLDivElement | null>(null)
  //
  // const [initialized, setInitialized] = useState(false)
  // const dispatch = useAppDispatch()
  //
  // const { data: clientProfile } = useUserProfileQuery(serverProfile.id, {
  //   skip: !initialized,
  // })
  // const { data: postData } = useGetPostsQuery(
  //   {
  //     pageNumber: page,
  //     pageSize: LIMIT,
  //     userId: serverProfile.userId,
  //   },
  //   {
  //     skip: !initialized,
  //   },
  // )
  // const profile = initialized ? clientProfile || serverProfile : serverProfile
  // const posts = initialized
  //   ? postData?.items || serverPostsData.items
  //   : serverPostsData.items
  //
  // const postsCount = initialized
  //   ? postData?.totalCount || serverPostsData.totalCount
  //   : serverPostsData.totalCount
  //
  // useEffect(() => {
  //   dispatch(
  //     postApi.util.upsertQueryData(
  //       'getPosts',
  //       { pageNumber: 1, pageSize: LIMIT, userId: serverProfile.userId },
  //       serverPostsData,
  //     ),
  //   )
  //
  //   dispatch(
  //     userApi.util.upsertQueryData(
  //       'userProfile',
  //       serverProfile.id,
  //       serverProfile,
  //     ),
  //   )
  //
  //   setInitialized(true)
  // }, [dispatch, serverPostsData, serverProfile])
  //
  // const handleNextPage = useCallback(() => {
  //   if (postData && page <= postData?.pagesCount) {
  //     setPage((prevPage) => prevPage + 1)
  //   }
  // }, [postData])
  //
  // useScroll(parentRef, childRef, handleNextPage)
  //
  // const { openPostModal } = usePostModal()
  //
  // return (
  //   <div className={s.profileBlock}>
  //     <div className={s.profileHeader}>
  //       {profile?.photoUrl ? (
  //         <Image src={profile.photoUrl} alt={''} width={234} height={228} />
  //       ) : (
  //         <Image
  //           src={'/assets/images/avatarPhoto.webp'}
  //           alt={''}
  //           width={204}
  //           height={204}
  //         />
  //       )}
  //       <div className={s.infoBlock}>
  //         <div className={s.profileAndButtonGroup}>
  //           <div className={s.profileNameAndPaidGroup}>
  //             <h1 className={s.userName}>{profile?.userName}</h1>
  //             {profile?.paymentAccount ? (
  //               <Image
  //                 src={'/assets/svg/Paid.png'}
  //                 alt={''}
  //                 width={24}
  //                 height={24}
  //               />
  //             ) : (
  //               <></>
  //             )}
  //           </div>
  //           <div className={s.buttonGroup}>
  //             {isCurrentUser ? (
  //               <Button variant={'default'}>Profile Settings</Button>
  //             ) : user?.email ? (
  //               <>
  //                 {profile?.followed ? (
  //                   <>
  //                     <Button variant={'default'}>Unfollow</Button>
  //                     <Button variant={'secondary'}>Send Message</Button>
  //                   </>
  //                 ) : (
  //                   <>
  //                     <Button variant={'default'}>Follow</Button>
  //                     <Button variant={'secondary'}>Send Message</Button>
  //                   </>
  //                 )}
  //               </>
  //             ) : null}
  //           </div>
  //         </div>
  //         <div className={s.followersBlock}>
  //           <div>
  //             <span>{profile?.subscriptions}</span>
  //             <span>Following</span>
  //           </div>
  //           <div>
  //             <span>{profile?.subscribers}</span>
  //             <span>Followers</span>
  //           </div>
  //           <div>
  //             <span>{postsCount}</span>
  //             <span>Publications</span>
  //           </div>
  //         </div>
  //         <p className={s.textBlock}>{profile?.aboutMe}</p>
  //       </div>
  //     </div>
  //
  //     <div ref={parentRef} className={s.posts}>
  //       {posts.map((post) => (
  //         <div className={s.imageContainer} key={post.id}>
  //           <Image
  //             src={post.photoUrls[0]}
  //             alt={post.description}
  //             width={234}
  //             height={228}
  //             onClick={openPostModal.bind(null, post.id)}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //     <div ref={childRef}></div>
  //   </div>
  // )

  return <Settings />
}
