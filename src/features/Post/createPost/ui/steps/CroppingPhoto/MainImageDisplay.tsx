'use client'

import Image from 'next/image'

import styles from './CroppingPhoto.module.scss'

interface MainImageDisplayProps {
  url: string
  scale: number
}

export const MainImageDisplay = ({ url, scale }: MainImageDisplayProps) => {
  return (
    <Image
      src={url}
      alt="Uploaded"
      width={500}
      height={500}
      className={styles.CarouselContainerImage}
      style={{ transform: `scale(${scale})` }}
    />
  )
}
