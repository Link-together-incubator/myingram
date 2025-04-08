'use client'

import Image from 'next/image'
import { ChangeEvent, useRef } from 'react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setAppAlert } from '@/shared/model/appSlice'
import { Button, Input } from '@/shared/ui'

import { AppPhoto } from '../steps.types'

import styles from './AddPhoto.module.scss'

export const AddPhoto = ({
  urls = [],
  setStepsState,
  handleOnOpenDraft,

  handleNext,
}: AppPhoto) => {
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
      let validFiles = true
      const maxFileSize = 20 * 1024 * 1024 // 20 МБ
      if (file) {
        const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(
          file.type,
        )
        const isValidSize = file.size <= maxFileSize

        if (!isValidType) {
          dispatch(setAppAlert({ type: 'error', message: 'Wrong type file' }))
          validFiles = false
        }
        if (!isValidSize) {
          dispatch(setAppAlert({ type: 'error', message: 'Wrong size file' }))
          validFiles = false
        }
        if (validFiles) {
          setStepsState(0, { urls: [...urls, file] })
          setStepsState(1, { urls: [...urls, file] })
          setStepsState(2, { urls: [...urls, file] })
          handleNext()
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
