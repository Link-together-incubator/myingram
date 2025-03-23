'use client'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Button, Input } from '@/shared/ui'

import { AppPhoto } from '../steps.types'

import styles from './AddPhoto.module.scss'

export const AddPhoto = ({
  url = null,
  setIsValid,
  setStepsState,
}: AppPhoto) => {
  const [selectedImage, setSelectedImage] = useState<null | string>(url)
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
        setSelectedImage(imageUrl)
      }
    }
  }

  useEffect(() => {
    return () => {
      setStepsState({ url: selectedImage })
    }
  }, [selectedImage])

  useEffect(() => {
    setIsValid(!!selectedImage)
  }, [selectedImage])

  return (
    <>
      <div>
        {selectedImage ? (
          <Image src={selectedImage} alt="Selected" width={100} height={100} />
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
    </>
  )
}
