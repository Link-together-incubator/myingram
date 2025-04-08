'use client'

import { BookImage, CirclePlus, CircleX, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { Carousel, Input } from '@/shared/ui'
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/Carousel/Carousel'
import { Slider } from '@/shared/ui/Slider/slider'

import { getValuesWithoutUndefined } from '../../../lib/getValuesWithoutUndefined'
import { CroppingPhoto } from '../steps.types'

import styles from './CroppingPhoto.module.scss'

export const CroppingPhotoStep = ({
  setStepsState,
  urls,
  handleDeleteImage,
  handleBack,
  setIsValid,
}: CroppingPhoto) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [scales, setScales] = useState<number[]>(Array(urls.length).fill(1))
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isZooming, setIsZooming] = useState(false)
  const [currentScale, setCurrentScale] = useState<number>(1)

  const handleScaleChanged = (newScale: number) => {
    setScales((prevScales) => {
      const newScales = [...prevScales]
      newScales[currentImageIndex] = newScale
      return newScales
    })
  }

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1)
  }

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1)
  }

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
        setIsValid(true)
      } else {
        alert('Вы можете загрузить до 10 изображений!')
      }
    }
  }

  useEffect(() => {
    if (urls.length === 0) {
      handleBack()
      setIsValid(false)
    }
  }, [urls.length])

  useEffect(() => {
    setCurrentScale(scales[currentImageIndex])
  }, [currentImageIndex, scales])

  console.log(currentImageIndex)
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
                    style={{ transform: `scale(${scales[currentImageIndex]})` }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className={styles.CarouselPrevBtn}
              onClick={handlePrev}
            />
            <CarouselNext
              className={styles.CarouselNextBtn}
              onClick={handleNext}
            />
            <div
              className={
                open
                  ? styles.ImagePreviewContainer
                  : styles.ImagePreviewHideContainer
              }
            >
              <div className={styles.imagePrevie}>
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
            <div
              className={styles.IconZoomContainer}
              onClick={() => setIsZooming(!isZooming)}
            >
              <ZoomIn width={30} height={30} color={'white'} />
            </div>
            {isZooming && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '70px',
                  width: '180px',
                  left: '100px',
                  zIndex: '10',
                  backgroundColor: 'rgba(23, 23, 23, 0.5)',
                  padding: '15px',
                  boxSizing: 'border-box',
                  alignItems: 'center',
                }}
              >
                <Slider
                  min={1}
                  max={4}
                  step={0.1}
                  value={[currentScale]}
                  onValueChange={(value: number[]) =>
                    handleScaleChanged(value[0])
                  }
                  className={styles.Slider}
                />
              </div>
            )}
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
                style={{ transform: `scale(${scales[0]})` }}
              />
              <div
                className={
                  open
                    ? styles.ImagePreviewContainer
                    : styles.ImagePreviewHideContainer
                }
              >
                <div className={styles.imagePrevie}>
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
              <div
                className={styles.IconZoomContainer}
                onClick={() => {
                  setIsZooming(!isZooming)
                  setCurrentImageIndex(0)
                }}
              >
                <ZoomIn width={30} height={30} color={'white'} />
              </div>
              {isZooming && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '70px',
                    width: '180px',
                    left: '100px',
                    zIndex: '10',
                    backgroundColor: 'rgba(23, 23, 23, 0.5)',
                    padding: '15px',
                    boxSizing: 'border-box',
                    alignItems: 'center',
                  }}
                >
                  <Slider
                    min={1}
                    max={4}
                    step={0.1}
                    value={[currentScale]}
                    onValueChange={(value: number[]) =>
                      handleScaleChanged(value[currentImageIndex])
                    }
                    className={styles.Slider}
                  />
                </div>
              )}
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
