'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import s from './ImageSlider.module.scss'

type ImageSliderProps = {
  images: string[] | string
  width?: number
  height?: number
}

export const ImageSlider = ({
  images,
  width = 490,
  height = 564,
}: ImageSliderProps) => {
  const normalizedImages = Array.isArray(images) ? images : [images]
  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length,
    )
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % normalizedImages.length)
  }

  const currentImage = normalizedImages[current]

  return (
    <div
      className={s.slider}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className={s.imageWrapper}>
        {currentImage ? (
          <Image
            src={currentImage}
            alt={`Slide ${current + 1}`}
            className={s.image}
            priority
            fill
            sizes="(max-width: 768px) 100vw, 490px"
          />
        ) : (
          <div className={s.imageFallback}>Нет изображения</div>
        )}
      </div>

      {normalizedImages.length > 1 && (
        <>
          <button className={`${s.nav} ${s.left}`} onClick={prevSlide}>
            <ChevronLeft size={28} />
          </button>
          <button className={`${s.nav} ${s.right}`} onClick={nextSlide}>
            <ChevronRight size={28} />
          </button>
          <div className={s.dots}>
            {normalizedImages.map((_, index) => (
              <div
                key={index}
                className={`${s.dot} ${index === current ? s.active : ''}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
