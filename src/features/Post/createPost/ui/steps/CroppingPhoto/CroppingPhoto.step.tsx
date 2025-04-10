'use client'

import { BookImage } from 'lucide-react'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setAppAlert } from '@/shared/model/appSlice'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/Carousel/Carousel'

import { CroppingPhoto } from '../steps.types'

import styles from './CroppingPhoto.module.scss'
import { MainImageDisplay } from './MainImageDisplay'
import { PreviewGallery } from './PreviewGallery'
import { ZoomControls } from './ZoomControls'

export const CroppingPhotoStep = ({
  setStepsState,
  urls,
  handleBack,
  scales: newScales,
}: CroppingPhoto) => {
  const dispatch = useAppDispatch()
  const [scales, setScales] = useState<number[]>(
    newScales || Array(urls.length).fill(1),
  )
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const currentScale = scales[currentImageIndex]
  const [open, setOpen] = useState(false)

  const blobs = useMemo(
    () => urls.map((url) => URL.createObjectURL(url)),
    [urls],
  )

  useEffect(
    () => () => blobs.forEach((url) => URL.revokeObjectURL(url)),
    [blobs],
  )

  useEffect(() => {
    if (urls.length === 0) handleBack()
  }, [urls.length])

  useEffect(() => {
    setStepsState(1, { scales })
    setStepsState(2, { scales })
  }, [scales])

  const handleScaleChanged = (newScale: number) => {
    setScales((prev) =>
      prev.map((scale, i) => (i === currentImageIndex ? newScale : scale)),
    )
  }

  const handleNext = () =>
    setCurrentImageIndex((prev) => Math.min(prev + 1, urls.length - 1))
  const handlePrev = () => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const files = Array.from(event.target.files)
    const validFiles: File[] = []
    const maxFileSize = 20 * 1024 * 1024

    for (const file of files) {
      const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(
        file.type,
      )
      const isValidSize = file.size <= maxFileSize

      if (!isValidType) {
        dispatch(setAppAlert({ message: 'Wrong type file', type: 'error' }))
        continue
      }

      if (!isValidSize) {
        dispatch(setAppAlert({ message: 'Wrong size file', type: 'error' }))
        continue
      }

      validFiles.push(file)
    }

    if (urls.length + validFiles.length > 10) {
      dispatch(setAppAlert({ message: 'Max upload is 10', type: 'error' }))
      return
    }

    if (validFiles.length > 0) {
      const newUrls = [...urls, ...validFiles]
      setStepsState(1, { urls: newUrls })
      setStepsState(2, { urls: newUrls })
      setScales([...scales, ...Array(validFiles.length).fill(1)])
    }
  }

  const handleDeleteImage = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index)
    const newScales = scales.filter((_, i) => i !== index)

    setStepsState(1, { urls: newUrls })
    setStepsState(2, { urls: newUrls })
    setScales(newScales)

    if (newUrls.length === 0) {
      setStepsState(0, { urls: newUrls })
    }

    if (currentImageIndex >= newUrls.length) {
      setCurrentImageIndex(Math.max(0, newUrls.length - 1))
    }
  }

  if (blobs.length === 0) return null

  return (
    <div className={styles.CarouselContainer}>
      {urls.length > 1 ? (
        <Carousel>
          <CarouselContent>
            {blobs.map((url, index) => (
              <CarouselItem key={url} className={styles.CarouseItem}>
                <MainImageDisplay url={url} scale={scales[index]} />
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
        </Carousel>
      ) : (
        <div className="singlePhotoContainer">
          <MainImageDisplay url={blobs[0]} scale={scales[0]} />
        </div>
      )}
      <PreviewGallery
        open={open}
        urls={blobs}
        onDelete={handleDeleteImage}
        onFileChange={handleImageChange}
      />
      <div className={styles.IconContainer} onClick={() => setOpen(!open)}>
        <BookImage width={30} height={30} color={'white'} />
      </div>

      <ZoomControls
        currentScale={currentScale}
        onScaleChange={handleScaleChanged}
      />
    </div>
  )
}
