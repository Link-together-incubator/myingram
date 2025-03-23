import { ComponentType } from 'react'

export type BasicStepProps<T = object> = {
  setIsValid: (isValid: boolean) => void
  setStepsState: (state: T) => void
}

type AddPhotoProps = {
  url: string | null
}

export type AppPhoto = BasicStepProps<AddPhotoProps> & AddPhotoProps

export type StepsType = ComponentType<AppPhoto>
