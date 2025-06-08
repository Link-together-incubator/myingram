import { Area } from 'react-easy-crop'

export const getCroppedImg = (imageSrc: string, croppedAreaPixels: Area) => {
  const image = new Image()
  image.crossOrigin = 'anonymous'
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  return new Promise<Blob>((resolve, reject) => {
    image.onload = () => {
      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height
      ctx?.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      )
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Canvas is empty or failed to generate a blob'))
        }
      }, 'image/jpeg')
    }
    image.src = imageSrc
  })
}
