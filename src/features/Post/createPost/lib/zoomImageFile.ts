export async function zoomImageFile(
  file: File,
  zoomLevel: number,
): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'))
      return
    }

    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas')
        // Сохраняем исходные размеры
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Рассчитываем новые размеры с учетом зума
        const scaledWidth = img.width / zoomLevel
        const scaledHeight = img.height / zoomLevel

        // Позиционируем изображение по центру
        const offsetX = (img.width - scaledWidth) / 2
        const offsetY = (img.height - scaledHeight) / 2

        // Рисуем увеличенную часть изображения
        ctx.drawImage(
          img,
          offsetX, // source x
          offsetY, // source y
          scaledWidth, // source width
          scaledHeight, // source height
          0, // destination x
          0, // destination y
          img.width, // destination width (original)
          img.height, // destination height (original)
        )

        // Конвертируем обратно в файл
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas to blob conversion failed'))
              return
            }

            const zoomedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })

            resolve(zoomedFile)
          },
          file.type,
          0.92,
        ) // 92% quality для JPEG
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}
