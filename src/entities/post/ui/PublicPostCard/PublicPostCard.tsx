'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { PostPayload } from '@/entities/post/post.types'
import { getTimeAgo } from '@/shared/lib/utils/getTimeAgo'
import { ImageSlider } from '@/shared/ui/ImageSlider/ImageSlider'

import s from './PublicPostCard.module.scss'

type Props = Pick<PostPayload, 'urls' | 'description' | 'createdAt'> & {
  postLink: string
  username: string
  avatarUrl: string
}

export const PublicPostCard = ({
  description,
  urls,
  createdAt,
  username,
  avatarUrl,
  postLink,
}: Props) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const onShowMoreClickHandler = () =>
    setIsDescriptionExpanded(!isDescriptionExpanded)

  const descriptionText = isDescriptionExpanded
    ? description
    : description.slice(0, 100).trim()
  const descriptionEnding = isDescriptionExpanded
    ? ' '
    : (description.length > 100 && '... ') || ''

  const photo =
    urls.length === 1 || isDescriptionExpanded ? (
      <Image alt={'post image'} priority fill src={urls[0].fileUrl} />
    ) : (
      <ImageSlider
        images={urls.map((u) => u.fileUrl)}
        width={234}
        height={240}
      />
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

        {description.length > 100 && (
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
