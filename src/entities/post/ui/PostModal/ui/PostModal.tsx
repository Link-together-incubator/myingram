'use client'

import { Bookmark, Heart, Send, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { postApi, useGetPostByIdQuery } from '@/entities/post/api/postApi'
import { PostPayload } from '@/entities/post/post.types'
import {
  CommentItem,
  DropdownMenu,
  ImageSlider,
  PostHeader,
} from '@/entities/post/ui'
import { useGetUserProfileQuery } from '@/entities/profile/api/profileApi'
import { useAuthMeQuery } from '@/features/autht/api/authApi'
import { DeletePostModal } from '@/features/Post/DeletePostModal/ui/DeletePostModal'
import { EditPostModal } from '@/features/Post/EditPostModal/ui/EditPostModal'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { Button } from '@/shared/ui'
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ModalWrapper'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

import s from './PostModal.module.scss'

type PostModalProps = {
  post: PostPayload
}
// type comments and likedUsers for json-server
type LikedUser = {
  id: string
  avatarUrl: string
}

export type PostComment = {
  id: string
  postId: string
  username: string
  avatarUrl: string
  text: string
  timeAgo: string
  liked: boolean
  likesCount: number
}

export function PostModal({ post: serverPost }: PostModalProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [comments, setComments] = useState<PostComment[]>([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [likedUsers, setLikedUsers] = useState<LikedUser[]>([])
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

  // fetch comments and likedUsers from json-server
  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const [commentsRes, likedRes] = await Promise.all([
          fetch(`http://localhost:3001/comments?postId=${post.id}`),
          fetch(`http://localhost:3001/likedUsers?postId=${post.id}`),
        ])

        const commentsData = await commentsRes.json()
        const likedData = await likedRes.json()

        setComments(commentsData)
        setLikedUsers(likedData)
      } catch (error) {
        console.error('Ошибка загрузки mock-данных:', error)
      }
    }

    fetchMockData()
  }, [post.id])

  const toggleLike = (id: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
              likesCount: comment.liked
                ? comment.likesCount - 1
                : comment.likesCount + 1,
            }
          : comment,
      ),
    )
  }

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
        photoUrls={post.photoUrls}
        onClose={() => setShowEditModal(false)}
        profile={profile}
      />
    )
  }

  return (
    <ModalWrapper onClose={closePostModal}>
      <div className={`${s.modal} ${s.postModalContent}`}>
        {showDeleteModal && (
          <DeletePostModal
            postId={post.id}
            onClose={() => setShowDeleteModal(false)}
          />
        )}
        {post.photoUrls && post.photoUrls.length > 1 ? (
          <ImageSlider images={post.photoUrls} />
        ) : (
          <Image
            src={post.photoUrls[0] || ''}
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
          profileImage={profile?.photoUrl || ''}
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
            {profile?.photoUrl ? (
              <Image
                src={profile.photoUrl}
                alt="avatar"
                width={36}
                height={36}
                className={s.avatar}
              />
            ) : (
              <div className={s.defaultAvatar} />
            )}
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

          <div className={s.commentsList}>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onLikeToggle={toggleLike}
              />
            ))}
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
              <div className={s.likes}>
                {likedUsers.slice(0, 3).map((user) => (
                  <Image
                    key={user.id}
                    src={user.avatarUrl}
                    alt="avatar"
                    width={24}
                    height={24}
                    className={s.avatarLikes}
                  />
                ))}
                <span>{likedUsers.length} &quot;Like&quot;</span>
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
