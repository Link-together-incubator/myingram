'use client'
import { ChangeEvent, useEffect, useMemo } from 'react'

import { MainImageDisplay } from '@/features/Post/createPost/ui/steps/CroppingPhoto/MainImageDisplay'
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

type Textarea = {
  description: string
}

const maxLength = 500

export const PublishPhotoStep = ({
  urls,
  postText,
  setStepsState,
  scales,
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
            {blobs.map((url, index) => (
              <CarouselItem key={url} className={styles.CarouseItem}>
                <MainImageDisplay url={url} scale={scales[index]} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={styles.CarouselPrevBtn} />
          <CarouselNext className={styles.CarouselNextBtn} />
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
          <span style={{ color: 'white' }}>User name</span>
        </div>
        <div style={{ padding: '15px', boxSizing: 'border-box' }}>
          <Textarea
            className={styles.PhotoDataTextArea}
            label="Add publication descriptions"
            placeholder="Text-area"
            style={{ width: '450px' }}
            value={postText}
            onChange={handleDescriptionChange}
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
