'use client'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef } from 'react'

import { Button, Input } from '@/shared/ui'

import { getValuesWithoutUndefined } from '../../../lib/getValuesWithoutUndefined'
import { AppPhoto } from '../steps.types'

import styles from './AddPhoto.module.scss'

export const AddPhoto = ({
  url,
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
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setStepsState(getValuesWithoutUndefined({ url: imageUrl }))
      }
    }
  }

  useEffect(() => {
    setIsValid(!!url)
  }, [url])

  return (
    <>
      <div>
        {url ? (
          <Image src={url} alt="Selected" width={100} height={100} />
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
