'use client'

import { Bookmark, Heart, Send, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { EditPostModal } from '@/features/Post/EditPostModal/ui/EditPostModal'
import { Button } from '@/shared/ui'
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ModalWrapper'

import { CommentItem } from '../../CommentItem/ui/CommentItem'
import { DropdownMenu } from '../../DropdownMenu/ui/DropdownMenu'
import { ImageSlider } from '../../ImageSlider/ui/ImageSlider'
import { PostHeader } from '../../PostHeader/ui/PostHeader'

import s from './PostModal.module.scss'

export type Post = {
  id: string
  userId: string
  photoUrls: string[]
  description: string
  createdAt: string
  updatedAt: string
}

type Comment = {
  id: string
  username: string
  avatarUrl: string
  text: string
  timeAgo: string
  liked: boolean
  likesCount: number
}

type PostModalProps = {
  post: Post
  onClose: () => void
}

type LikedUser = {
  id: string
  avatarUrl: string
}

const likedUsers: LikedUser[] = [
  { id: '1', avatarUrl: '/assets/images/ava.png' },
  { id: '2', avatarUrl: '/assets/images/ava.png' },
  { id: '3', avatarUrl: '/assets/images/ava.png' },
]

export function PostModal({ post, onClose }: PostModalProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3001/comments?postId=${post.id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
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
    alert('Delete clicked')
    setShowMenu(false)
  }

  const handlePublish = () => {
    alert('Publish clicked')
  }

  if (showEditModal) {
    return (
      <EditPostModal
        postId={post.id}
        initialDescription={post.description}
        photoUrls={post.photoUrls}
        onClose={() => setShowEditModal(false)}
        userId={post.userId}
      />
    )
  }

  return (
    <ModalWrapper onClose={onClose}>
      <div className={s.image}>
        {post.photoUrls && post.photoUrls.length > 1 ? (
          <ImageSlider images={post.photoUrls} />
        ) : (
          <Image
            src={post.photoUrls[0] || ''}
            alt="Post image"
            width={490}
            height={562}
            className={s.img}
          />
        )}
      </div>
      <div className={s.content}>
        <button className={s.closeButton} onClick={onClose}>
          <X size={24} color="white" />
        </button>

        <PostHeader
          username={post.userId}
          onToggleMenu={() => setShowMenu((prev) => !prev)}
          showMenu={showMenu}
        >
          <DropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
        </PostHeader>
        <div className={s.scrollableArea}>
          <div className={s.postDescription}>
            <Image
              src="/assets/images/ava.png"
              alt="avatar"
              width={36}
              height={36}
              className={s.avatar}
            />
            <div className={s.commentBlock}>
              <p className={s.commentText}>
                <span className={s.usernameBold}>{post.userId}</span>{' '}
                {post.description}
              </p>
              <div className={s.time}>2 hours ago</div>
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
                <span>2 243 &quot;Like&quot;</span>
              </div>
              <span className={s.time}>
                {' '}
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
