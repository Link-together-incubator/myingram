'use client'

import { ZoomIn } from 'lucide-react'
import { useState } from 'react'

import { Slider } from '@/shared/ui/Slider/slider'

import styles from './CroppingPhoto.module.scss'

interface ZoomControlsProps {
  currentScale: number
  onScaleChange: (value: number) => void
}

export const ZoomControls = ({
  currentScale,
  onScaleChange,
}: ZoomControlsProps) => {
  const [isZooming, setIsZooming] = useState(false)

  return (
    <>
      <div
        className={styles.IconZoomContainer}
        onClick={() => setIsZooming(!isZooming)}
      >
        <ZoomIn width={30} height={30} color={'white'} />
      </div>
      {isZooming && (
        <div className={styles.ZoomPreview}>
          <Slider
            min={1}
            max={4}
            step={0.1}
            value={[currentScale]}
            onValueChange={(value: number[]) => onScaleChange(value[0])}
            className={styles.Slider}
          />
        </div>
      )}
    </>
  )
}
