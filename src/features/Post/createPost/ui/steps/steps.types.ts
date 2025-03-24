import { ComponentType } from 'react'

export type BasicStepProps<T = object> = {
  setIsValid: (isValid: boolean) => void
  setStepsState: (state: Partial<T> | null) => void
  handleOnOpenDraft: () => void
}

type AddPhotoProps = {
  url: string
}

export type AppPhoto = BasicStepProps<AddPhotoProps> & AddPhotoProps

export type StepsType = ComponentType<AppPhoto>
