'use client'

import Image from 'next/image'
import { ChangeEvent, useRef } from 'react'

import { Button, Input } from '@/shared/ui'

import { getValuesWithoutUndefined } from '../../../lib/getValuesWithoutUndefined'
import { AppPhoto } from '../steps.types'

import styles from './AddPhoto.module.scss'

export const AddPhoto = ({
  urls = [],
  setIsValid,
  setStepsState,
  handleOnOpenDraft,
}: AppPhoto) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0]
      let validFiles = true
      const maxFileSize = 20 * 1024 * 1024 // 20 МБ
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(
          file.type,
        )
        const isValidSize = file.size <= maxFileSize

        if (!isValidType) {
          alert('Файлы могут быть только в формате PNG, JPG или JPEG')
          validFiles = false
        }
        if (!isValidSize) {
          alert('Размер файла должен быть не более 20 МБ')
          validFiles = false
        }
        if (validFiles) {
          setStepsState(
            1,
            getValuesWithoutUndefined({ urls: [...urls, imageUrl] }),
          )
          setStepsState(
            2,
            getValuesWithoutUndefined({ urls: [...urls, imageUrl] }),
          )
          setIsValid(true)
        }
      }
    }
  }

  return (
    <>
      <div>
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
        <Button
          onClick={handleOnOpenDraft}
          variant={'secondary'}
          className={styles.button}
        >
          Open Draft
        </Button>
      </div>
    </>
  )
}
