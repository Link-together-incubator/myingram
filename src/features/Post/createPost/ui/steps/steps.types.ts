import { ComponentType } from 'react'

export type BasicStepProps<T = object> = {
  setStepsState: (index: number, state: Partial<T> | null) => void
  handleBack: () => void
  handleNext: () => void
}

export type AddPhotoProps = {
  handleOnOpenDraft: () => void
  urls: File[]
}
export type CroppingPhotoProps = {
  urls: File[]
  scales: number[]
}
export type PublishPhotoProps = {
  postText: string
  urls: File[]
  scales: number[]
}
export type AppPhoto = BasicStepProps<AddPhotoProps> & AddPhotoProps
export type CroppingPhoto = BasicStepProps<CroppingPhotoProps> &
  CroppingPhotoProps
export type PublishPhoto = BasicStepProps<PublishPhotoProps> & PublishPhotoProps
export type StepsType =
  | ComponentType<AppPhoto>
  | ComponentType<PublishPhoto>
  | ComponentType<CroppingPhoto>

export type DraftType = Array<{
  description: string
  files: ArrayBuffer[]
}>
