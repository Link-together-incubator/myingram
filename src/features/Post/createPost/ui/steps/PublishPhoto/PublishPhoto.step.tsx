'use client'
import Image from 'next/image'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { Carousel, Textarea } from '@/shared/ui'
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/Carousel/Carousel'
import { Separator } from '@/shared/ui/Separator/Separator'

import { PublishPhoto } from '../steps.types'

import styles from './PublishPhoto.module.scss'

const maxLength = 500

export const PublishPhotoStep = ({
  urls,
  postText,
  setStepsState,
  scales,
  isLoading,
}: PublishPhoto) => {
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    if (inputValue.length <= maxLength) {
      setStepsState(2, { postText: inputValue })
    }
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { data: user } = useAuthMeQuery()

  const blobs = useMemo(() => {
    return urls.map((url) => URL.createObjectURL(url))
  }, [urls])

  useEffect(
    () => () => {
      blobs.forEach((url) => URL.revokeObjectURL(url))
    },
    [blobs],
  )
  const handleNext = () =>
    setCurrentImageIndex((prev) => Math.min(prev + 1, urls.length - 1))
  const handlePrev = () => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))

  return (
    <div style={{ display: 'flex' }}>
      <div className={styles.CarouselContainer}>
        <Carousel>
          <CarouselContent>
            {blobs.map((url, index) => (
              <CarouselItem key={url} className={styles.CarouseItem}>
                <Image
                  src={url}
                  alt={`Uploaded ${index}`}
                  width={500}
                  height={500}
                  className={styles.CarouselContainerImage}
                  style={{
                    transform: `scale(${currentImageIndex === index ? scales[index] : 1})`,
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            onClick={handlePrev}
            className={styles.CarouselPrevBtn}
          />
          <CarouselNext
            onClick={handleNext}
            className={styles.CarouselNextBtn}
          />
        </Carousel>
      </div>
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '15px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: `var(--dark-500)`,
              borderRadius: '50%',
            }}
          ></div>
          <span style={{ color: 'white' }}>{user?.name}</span>
        </div>
        <div style={{ padding: '15px', boxSizing: 'border-box' }}>
          <Textarea
            className={styles.PhotoDataTextArea}
            label="Add publication descriptions"
            placeholder="Text-area"
            style={{ width: '450px' }}
            value={postText}
            onChange={handleDescriptionChange}
            disabled={isLoading}
          />
        </div>
        <div
          style={{
            marginTop: '5px',
            padding: '15px',
            boxSizing: 'border-box',
          }}
        >
          <p style={{ color: 'white' }}>
            {postText?.length || 0}/{maxLength}
          </p>
        </div>
        <Separator className={styles.Separator} />
      </div>
    </div>
  )
}
