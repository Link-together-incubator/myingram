'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import s from './ImageSlider.module.scss'

type ImageSliderProps = {
  images: string[]
}

export const ImageSlider = ({ images }: ImageSliderProps) => {
  const [current, setCurrent] = useState(0)

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  return (
    <div className={s.slider}>
      <div className={s.imageWrapper}>
        <Image
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className={s.image}
          priority
          fill
        />
      </div>

      <button className={`${s.nav} ${s.left}`} onClick={prevSlide}>
        <ChevronLeft size={28} />
      </button>
      <button className={`${s.nav} ${s.right}`} onClick={nextSlide}>
        <ChevronRight size={28} />
      </button>
      <div className={s.dots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${s.dot} ${index === current ? s.active : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
