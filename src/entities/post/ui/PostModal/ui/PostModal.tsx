'use client'

import { Bookmark, Heart, Send, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { postApi, useGetPostByIdQuery } from '@/entities/post/api/postApi'
import { PostPayload } from '@/entities/post/post.types'
import { DropdownMenu, PostHeader } from '@/entities/post/ui'
import { useGetUserProfileQuery } from '@/entities/profile/api/profileApi'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { DeletePostModal } from '@/features/Post/DeletePostModal/ui/DeletePostModal'
import { EditPostModal } from '@/features/Post/EditPostModal/ui/EditPostModal'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { Button } from '@/shared/ui'
import { ImageSlider } from '@/shared/ui/ImageSlider/ImageSlider'
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ModalWrapper'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

import s from './PostModal.module.scss'

type PostModalProps = {
  post: PostPayload
}
export function PostModal({ post: serverPost }: PostModalProps) {
  const [showMenu, setShowMenu] = useState(false)
  // const [comments, setComments] = useState<PostComment[]>([])
  const [showEditModal, setShowEditModal] = useState(false)
  // const [likedUsers, setLikedUsers] = useState<LikedUser[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data: authUser } = useAuthMeQuery()
  const { closePostModal } = usePostModal()
  const dispatch = useAppDispatch()

  const isInitQuery = useRef(true)

  const { data: clientPost } = useGetPostByIdQuery(
    { postId: serverPost.id },
    { skip: isInitQuery.current },
  )
  const post = clientPost || serverPost
  const isAuthor = authUser?.id === post.userId
  const { data: profile } = useGetUserProfileQuery(post.userId)

  useEffect(() => {
    isInitQuery.current = false
    dispatch(
      postApi.util.upsertQueryData('getPostById', { postId: post.id }, post),
    )
  }, [])

  const handleEdit = () => {
    setShowEditModal(true)
    setShowMenu(false)
  }

  const handleDelete = () => {
    setShowMenu(false)
    setShowDeleteModal(true)
  }

  const handlePublish = () => {
    alert('Publish clicked')
  }

  if (showEditModal && profile) {
    return (
      <EditPostModal
        postId={post.id}
        initialDescription={post.description}
        urls={post.urls}
        onClose={() => setShowEditModal(false)}
        profile={profile}
      />
    )
  }
  const isFakePhoto = profile?.photoUrl?.includes('empty.jpg')
  const avatarSrc =
    !profile?.photoUrl || isFakePhoto
      ? '/assets/images/avatarPhoto.webp'
      : profile.photoUrl

  return (
    <ModalWrapper onClose={closePostModal}>
      <div className={`${s.modal} ${s.postModalContent}`}>
        {showDeleteModal && (
          <DeletePostModal
            postId={post.id}
            onClose={() => setShowDeleteModal(false)}
          />
        )}
        {post.urls && post.urls.length > 1 ? (
          <ImageSlider images={post.urls.map((url) => url.fileUrl)} />
        ) : (
          <Image
            src={post.urls?.[0]?.fileUrl || ''}
            alt="Post image"
            width={490}
            height={564}
            className={s.img}
          />
        )}
      </div>
      <div className={s.content}>
        <button className={s.closeButton} onClick={closePostModal}>
          <X size={24} color="white" />
        </button>

        <PostHeader
          username={
            profile?.userName ? (
              profile.userName
            ) : (
              <div className="h-[20px] w-[100px]">
                <Skeleton className="h-full w-full" />
              </div>
            )
          }
          profileImage={avatarSrc}
          onToggleMenu={() => setShowMenu((prev) => !prev)}
          showMenu={showMenu}
        >
          <DropdownMenu
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAuthor={isAuthor}
          />
        </PostHeader>
        <div className={s.scrollableArea}>
          <div className={s.postDescription}>
            <Image
              src={avatarSrc}
              alt="avatar"
              width={36}
              height={36}
              className={s.avatar}
            />
            <div className={s.commentBlock}>
              <div className={s.commentText}>
                <span className={s.usernameBold}>
                  {profile?.userName ? (
                    profile.userName
                  ) : (
                    <div className="h-[20px] w-[100px]">
                      <Skeleton className="h-full w-full" />
                    </div>
                  )}
                </span>{' '}
                {post.description}
              </div>
              <span className={s.time}>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        <div className={s.footer}>
          <div className={s.footerContent}>
            <div className={s.footerIcons}>
              <Heart size={24} color="var(--light-100)" />
              <Send color="var(--light-100)" size={24} />
              <Bookmark color="var(--light-100)" size={24} />
            </div>

            <div className={s.footerStats}>
              <span className={s.time}>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className={s.footerComment}>
            <input type="text" placeholder="Add a Comment..." />
            <Button variant="link" onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
