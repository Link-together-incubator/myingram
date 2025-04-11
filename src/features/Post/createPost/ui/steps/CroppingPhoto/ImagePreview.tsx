'use client'

import { CircleX } from 'lucide-react'
import Image from 'next/image'

import styles from './CroppingPhoto.module.scss'

interface ImagePreviewProps {
  url: string
  index: number
  onDelete: (index: number) => void
}

export const ImagePreview = ({ url, index, onDelete }: ImagePreviewProps) => {
  return (
    <div style={{ position: 'relative' }}>
      <Image
        src={url}
        width={50}
        height={70}
        className={styles.minImg}
        alt={`Uploaded ${index + 1}`}
      />
      <div className={styles.deleteImage} onClick={() => onDelete(index)}>
        <CircleX color={'white'} width={20} height={20} />
      </div>
    </div>
  )
}
