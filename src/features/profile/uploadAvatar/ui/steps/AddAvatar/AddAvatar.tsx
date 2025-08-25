import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'

import { usePostModal } from '@/shared/lib/hooks/usePostModal'
import { Button, Input } from '@/shared/ui'

import s from './AddAvatar.module.scss'

type AddAvatarProps = {
  onFileSelected: (file: File) => void
}

export const AddAvatar = ({ onFileSelected }: AddAvatarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const { closeAvatarModal } = usePostModal()
  const MAX_SIZE_MB = 10

  const openFileDialog = () => {
    setError(null)
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(
      file.type,
    )
    const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024

    if (!isValidType) {
      setError('The format of the uploaded photo must be PNG or JPEG')
      closeAvatarModal()
      return
    }

    if (!isValidSize) {
      setError('Photo size must be less than 10 MB!')
      closeAvatarModal()
      return
    }
    setError(null)
    onFileSelected(file)
  }
  return (
    <div className={s.container}>
      {error && (
        <div className={s.errorMessage}>
          {' '}
          <strong>Error!</strong> {error}
        </div>
      )}
      <div className={`${s.content} ${error ? s['content--hasError'] : ''}`}>
        <div className={s.imageContainer}>
          <Image
            src={'/assets/images/create-photo-icon.png'}
            alt="photo-icon"
            width={50}
            height={50}
          />
        </div>

        <div className={s.buttonContainer}>
          <Input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <Button
            variant="default"
            className={s.button}
            onClick={openFileDialog}
          >
            Select from computer
          </Button>
        </div>
      </div>
    </div>
  )
}
