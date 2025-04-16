'use client'
import { Heart } from 'lucide-react'
import Image from 'next/image'

import { PostComment } from '../../PostModal/ui/PostModal'

import s from './CommentItem.module.scss'

type Props = {
  comment: PostComment
  onLikeToggle: (id: string) => void
}

export function CommentItem({ comment, onLikeToggle }: Props) {
  return (
    <div className={s.commentItem}>
      <div className={s.commentMeta}>
        <Image src={comment.avatarUrl} alt="avatar" width={36} height={36} />
        <div className={s.commentBlock}>
          <p className={s.commentText}>
            <span className={s.usernameBold}>{comment.username}</span>{' '}
            {comment.text}
          </p>
          <div className={s.commentFooter}>
            <span className={s.time}>{comment.timeAgo}</span>
            {comment.likesCount > 0 && (
              <span className={s.likes}>Like: {comment.likesCount}</span>
            )}
            <span className={s.answer}>Answer</span>
          </div>
        </div>
      </div>
      <Heart
        onClick={() => onLikeToggle(comment.id)}
        size={16}
        className={s.heartIcon}
        color={comment.liked ? 'var(--danger-500)' : 'var(--light-100)'}
        fill={comment.liked ? 'var(--danger-500)' : 'none'}
      />
    </div>
  )
}
