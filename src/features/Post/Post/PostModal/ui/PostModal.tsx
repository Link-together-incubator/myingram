'use client'

import { Bookmark, Heart, Send, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/shared/ui'

import { CommentItem } from '../../CommentItem/ui/CommentItem'
import { DropdownMenu } from '../../DropdownMenu/ui/DropdownMenu'
import { ImageSlider } from '../../ImageSlider/ui/ImageSlider'
import { PostHeader } from '../../PostHeader/ui/PostHeader'

import s from './PostModal.module.scss'

export type Post = {
  id: string
  imageUrl?: string
  images?: string[]
  description: string
  username: string
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

const mockComments: Comment[] = [
  {
    id: '1',
    username: 'URLProfiele',
    avatarUrl: '/assets/images/ava.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeAgo: '2 hours ago',
    liked: false,
    likesCount: 0,
  },
  {
    id: '2',
    username: 'OtherUser',
    avatarUrl: '/assets/images/ava.png',
    text: 'Nice photo!',
    timeAgo: '1 hour ago',
    liked: true,
    likesCount: 1,
  },
  {
    id: '3',
    username: 'OtherUser',
    avatarUrl: '/assets/images/ava.png',
    text: 'Nice photo!',
    timeAgo: '1 hour ago',
    liked: true,
    likesCount: 1,
  },
  {
    id: '4',
    username: 'OtherUser',
    avatarUrl: '/assets/images/ava.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeAgo: '1 hour ago',
    liked: true,
    likesCount: 1,
  },
  {
    id: '5',
    username: 'OtherUser',
    avatarUrl: '/assets/images/ava.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeAgo: '1 hour ago',
    liked: true,
    likesCount: 1,
  },
]

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
  const [comments, setComments] = useState<Comment[]>(mockComments)

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
    alert('Edit clicked')
    setShowMenu(false)
  }

  const handleDelete = () => {
    alert('Delete clicked')
    setShowMenu(false)
  }

  const handlePublish = () => {
    alert('Publish clicked')
  }

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.image}>
          {post.images && post.images.length > 1 ? (
            <ImageSlider images={post.images} />
          ) : (
            <Image
              src={post.imageUrl || ''}
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
            username={post.username}
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
                  <span className={s.usernameBold}>{post.username}</span>{' '}
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
                <span className={s.time}>July 3, 2021</span>
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
      </div>
    </div>
  )
}
