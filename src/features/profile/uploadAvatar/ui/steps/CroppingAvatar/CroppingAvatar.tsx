import { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { Button } from '@/shared/ui'

import { getCroppedImg } from '../../../lib/getCroppedImg'

import s from './CroppingAvatar.module.scss'

type CroppingAvatarStepProps = {
  imageSrc: string
  onCropComplete: (croppedImage: Blob) => void
}

export const CroppingAvatar = ({
  imageSrc,
  onCropComplete,
}: CroppingAvatarStepProps) => {
  console.log('CroppingAvatar rendered')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1.4)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const handleSave = async () => {
    console.log('handleSave triggered')
    if (!croppedAreaPixels) return
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels)
    console.log('cropped blob:', blob)
    onCropComplete(blob)
  }

  return (
    <div className={s.content}>
      <div className={s.cropperWrapper}>
        <Cropper
          image={imageSrc}
          cropShape="round"
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropSize={{ width: 300, height: 300 }}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          showGrid={false}
          onCropComplete={(_, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels)
          }}
        />
      </div>
      <div className={s.buttonContainer}>
        <Button variant={'default'} onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
