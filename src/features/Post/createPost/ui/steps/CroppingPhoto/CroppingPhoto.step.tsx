'use client'

import { BookImage, CirclePlus, CircleX } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Carousel, Input } from '@/shared/ui'
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/Carousel/Carousel'

import { getValuesWithoutUndefined } from '../../../lib/getValuesWithoutUndefined'
import { CroppingPhoto } from '../steps.types'

import styles from './CroppingPhoto.module.scss'

export const CroppingPhotoStep = ({
  setStepsState,
  urls,
  handleDeleteImage,
  handleBack,
}: CroppingPhoto) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      const imageUrls: string[] = []
      let validFiles = true
      const maxFileSize = 20 * 1024 * 1024 // 20 МБ

      for (const file of files) {
        const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(
          file.type,
        )
        const isValidSize = file.size <= maxFileSize

        if (!isValidType) {
          alert('Файлы могут быть только в формате PNG, JPG или JPEG')
          validFiles = false
          break // Прекращаем проверку на первой ошибке
        }

        if (!isValidSize) {
          alert('Размер файла должен быть не более 20 МБ')
          validFiles = false
          break // Прекращаем проверку на первой ошибке
        }

        if (validFiles) {
          imageUrls.push(URL.createObjectURL(file))
        }
      }
      // Проверяем, не превышает ли количество загружаемых изображений 10
      if (urls.length + imageUrls.length <= 10) {
        setStepsState(
          1,
          getValuesWithoutUndefined({ urls: [...urls, ...imageUrls] }),
        )
        setStepsState(
          2,
          getValuesWithoutUndefined({ urls: [...urls, ...imageUrls] }),
        )
      } else {
        alert('Вы можете загрузить до 10 изображений!')
      }
    }
  }

  useEffect(() => {
    if (urls.length === 0) {
      handleBack()
    }
  }, [urls.length])

  return (
    <>
      <div className={styles.CarouselContainer}>
        {urls.length > 1 ? (
          <Carousel>
            <CarouselContent>
              {urls.map((url, index) => (
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
            <div
              className={
                open
                  ? styles.ImagePreviewContainer
                  : styles.ImagePreviewHideContainer
              }
            >
              <div className={styles.imagePreview}>
                {urls.map((url, index) => {
                  return (
                    <div key={url} style={{ position: 'relative' }}>
                      <Image
                        src={url}
                        width={50}
                        height={70}
                        className={styles.minImg}
                        alt={`Uploaded ${index + 1}`}
                      />
                      <div
                        className={styles.deleteImage}
                        onClick={() => {
                          handleDeleteImage(1, url)
                          handleDeleteImage(2, url)
                        }}
                      >
                        <CircleX
                          color={'white'}
                          width={20}
                          height={20}
                          type="default"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <CirclePlus
                  width={30}
                  height={30}
                  color={'white'}
                  onClick={openFileDialog}
                />
              </div>
            </div>
            <div
              className={styles.IconContainer}
              onClick={() => setOpen(!open)}
            >
              <BookImage width={30} height={30} color={'white'} />
            </div>
          </Carousel>
        ) : (
          urls.length === 1 && (
            <div className={styles.CarouselContainerSinglePhoto}>
              <Image
                src={urls[0]}
                alt="Uploaded"
                width={500}
                height={500}
                className={styles.CarouselContainerImage}
              />
              <div
                className={
                  open
                    ? styles.ImagePreviewContainer
                    : styles.ImagePreviewHideContainer
                }
              >
                <div className={styles.imagePreview}>
                  <div style={{ position: 'relative' }}>
                    <Image
                      src={urls[0]}
                      width={70}
                      height={70}
                      className={styles.minImg}
                      alt="Uploaded"
                    />
                    <div
                      className={styles.deleteImage}
                      onClick={() => {
                        handleDeleteImage(1, urls[0])
                      }}
                    >
                      <CircleX
                        color={'white'}
                        width={20}
                        height={20}
                        type="default"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <CirclePlus
                    width={30}
                    height={30}
                    color={'white'}
                    onClick={openFileDialog}
                  />
                </div>
              </div>
              <div
                className={styles.IconContainer}
                onClick={() => setOpen(!open)}
              >
                <BookImage width={30} height={30} color={'white'} />
              </div>
            </div>
          )
        )}
      </div>
      <div>
        <Input
          type="file"
          accept="image/*"
          multiple // Позволяем загружать несколько файлов
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
      </div>
    </>
  )
}
