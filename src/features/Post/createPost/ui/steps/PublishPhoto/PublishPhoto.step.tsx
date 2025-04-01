'use client'
import Image from 'next/image'
import { ChangeEvent, useEffect, useMemo } from 'react'

import { Carousel, Textarea } from '@/shared/ui'
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/Carousel/Carousel'

import { PublishPhoto } from '../steps.types'

import styles from './PublishPhoto.module.scss'

type Textarea = {
  description: string
}

const maxLength = 500

export const PublishPhotoStep = ({
  urls,
  postText,
  setStepsState,
}: PublishPhoto) => {
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    if (inputValue.length <= maxLength) {
      setStepsState(2, { postText: inputValue })
    }
  }

  const blobs = useMemo(() => {
    return urls.map((url) => URL.createObjectURL(url))
  }, [urls])

  useEffect(
    () => () => {
      blobs.forEach((url) => URL.revokeObjectURL(url))
    },
    [blobs],
  )

  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.CarouselContainer}>
        <Carousel>
          <CarouselContent>
            {blobs?.map((url, index) => (
              <CarouselItem key={url} className={styles.CarouseItem}>
                <Image
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  width={500}
                  height={500}
                  className={styles.CarouselContainerImage}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={styles.CarouselPrevBtn} />
          <CarouselNext className={styles.CarouselNextBtn} />
        </Carousel>
      </div>
      <div>
        <div>
          <Textarea
            className={styles.PhotoDataTextArea}
            label="Add publication descriptions"
            placeholder="Text-area"
            style={{ width: '450px' }}
            value={postText}
            onChange={handleDescriptionChange}
          />
        </div>
        <div style={{ marginTop: '25px' }}>
          <p style={{ color: 'white' }}>
            {postText?.length || 0}/{maxLength}
          </p>
        </div>
      </div>
    </div>
  )
}
