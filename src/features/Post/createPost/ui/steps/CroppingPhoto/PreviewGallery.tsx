'use client'

import { ChangeEvent } from 'react'

import styles from './CroppingPhoto.module.scss'
import { FileInput } from './FileInput'
import { ImagePreview } from './ImagePreview'

interface PreviewGalleryProps {
  urls: string[]
  onDelete: (index: number) => void
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  open: boolean
}

export const PreviewGallery = ({
  urls,
  onDelete,
  onFileChange,
  open,
}: PreviewGalleryProps) => {
  return (
    <div
      className={
        open ? styles.ImagePreviewContainer : styles.ImagePreviewHideContainer
      }
    >
      <div className={styles.imagePreview}>
        {urls.map((url, index) => (
          <ImagePreview key={url} url={url} index={index} onDelete={onDelete} />
        ))}
      </div>
      <FileInput onChange={onFileChange} />
    </div>
  )
}
