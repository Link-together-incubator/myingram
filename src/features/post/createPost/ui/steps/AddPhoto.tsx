'use client'
import { X } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button, Input } from '@/shared/ui'

import { setIsShowCreatePostModal } from '../../model/postSlice'

import styles from './AddPhoto.module.scss'

export const AddPhoto = () => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const dispatch = useAppDispatch()
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setSelectedImage(imageUrl)
      }
    }
  }

  const handleOnCloseModal = () => {
    dispatch(setIsShowCreatePostModal(null))
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add photo</h2>
          <X onClick={handleOnCloseModal} className={styles.closeButton} />
        </div>
        <div>
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Selected"
              width={100}
              height={100}
            />
          ) : (
            <div className={styles.content}>
              <div className={styles.imageContainer}>
                <div>
                  <Image
                    src={'/assets/images/create-photo-icon.png'}
                    alt="photo-icon"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <Button
            variant={'default'}
            className={styles.button}
            onClick={openFileDialog}
          >
            Select from computer
          </Button>
          <Button variant={'secondary'} className={styles.button}>
            Open Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
