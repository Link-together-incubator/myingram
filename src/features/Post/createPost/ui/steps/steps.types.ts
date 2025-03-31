import { ComponentType } from 'react'

export type BasicStepProps<T = object> = {
  setIsValid: (isValid: boolean) => void
  setStepsState: (index: number, state: Partial<T> | null) => void
}

type AddPhotoProps = {
  urls: string[]
  handleOnOpenDraft: () => void
  handleBack: () => void
  handleDeleteImage: (inx: number, url: string) => void
}
type CroppingPhotoProps = {
  urls: string[]
  handleBack: () => void
  handleDeleteImage: (inx: number, url: string) => void
}
type PublishPhotoProps = {
  urls: string[]
}
export type AppPhoto = BasicStepProps<AddPhotoProps> & AddPhotoProps
export type CroppingPhoto = BasicStepProps<CroppingPhotoProps> &
  CroppingPhotoProps
export type PublishPhoto = BasicStepProps<PublishPhotoProps> & PublishPhotoProps
export type StepsType = ComponentType<AppPhoto>
