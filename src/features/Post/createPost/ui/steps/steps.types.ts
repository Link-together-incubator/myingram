import { ComponentType } from 'react'

export type BasicStepProps<T = object> = {
  setStepsState: (index: number, state: Partial<T> | null) => void
  handleBack: () => void
  handleNext: () => void
}

export type AddPhotoProps = {
  urls: string[]
  handleOnOpenDraft: () => void
  handleDeleteImage: (inx: number, url: string) => void
}
export type CroppingPhotoProps = {
  urls: string[]
  handleDeleteImage: (inx: number, url: string) => void
}
export type PublishPhotoProps = {
  urls: string[]
  postText: string
}
export type AppPhoto = BasicStepProps<AddPhotoProps> & AddPhotoProps
export type CroppingPhoto = BasicStepProps<CroppingPhotoProps> &
  CroppingPhotoProps
export type PublishPhoto = BasicStepProps<PublishPhotoProps> & PublishPhotoProps
export type StepsType =
  | ComponentType<AppPhoto>
  | ComponentType<PublishPhoto>
  | ComponentType<CroppingPhoto>
