'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Post } from '@/entities/post/post.types'
import { getTimeAgo } from '@/shared/lib/utils/getTimeAgo'
import { ImageSlider } from '@/shared/ui/ImageSlider/ImageSlider'

import s from './PublicPostCard.module.scss'

type Props = Pick<Post, 'title' | 'createdAt'> & {
  postLink: string
  username: string
  avatarUrl: string
  photoUrls: string[]
}

export const PublicPostCard = ({
  title,
  photoUrls,
  createdAt,
  username,
  avatarUrl,
  postLink,
}: Props) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const onShowMoreClickHandler = () =>
    setIsDescriptionExpanded(!isDescriptionExpanded)

  const descriptionText = isDescriptionExpanded
    ? title
    : title.slice(0, 100).trim()
  const descriptionEnding = isDescriptionExpanded
    ? ' '
    : (title.length > 100 && '... ') || ''

  const photo =
    photoUrls.length === 1 || isDescriptionExpanded ? (
      <ImageSlider images={[photoUrls[0]]} width={234} height={240} />
    ) : (
      <ImageSlider images={photoUrls} width={234} height={240} />
    )

  return (
    <div className={s.container}>
      <div className={s.publicPagePost}>
        <Link href={postLink}>
          <div className={clsx(s.postImages, isDescriptionExpanded && s.hide)}>
            {photo}
          </div>
        </Link>

        <div className={s.user}>
          <Image
            alt={'avatar'}
            className={s.avatar}
            height={36}
            priority
            src={avatarUrl}
            width={36}
          />

          {username}
        </div>

        <span className={s.publicationTime}>{getTimeAgo(createdAt)}</span>
      </div>

      <p className={s.description}>
        {descriptionText + descriptionEnding}

        {title.length > 100 && (
          <button
            className={s.showMore}
            onClick={onShowMoreClickHandler}
            type={'button'}
          >
            {isDescriptionExpanded ? 'Hide' : 'Show more'}
          </button>
        )}
      </p>
    </div>
  )
}
