import {
  AddPhotoProps,
  CroppingPhotoProps,
  PublishPhotoProps,
} from '../ui/steps/steps.types'

export const isValidStep = (
  state: AddPhotoProps | CroppingPhotoProps | PublishPhotoProps,
  stepIndex: number,
): boolean => {
  if (state === null) return false
  if (!Array.isArray(state.urls) || state.urls.length === 0) {
    return false
  }
  const areAllUrlsStrings = state.urls.every((url) => typeof url === 'object')
  if (!areAllUrlsStrings) {
    return false
  }
  switch (stepIndex) {
    case 0:
      return true

    case 1:
      return true
    case 2:
      return 'postText' in state && state.postText.length > 0

    default:
      throw new Error('Несуществующий шаг')
  }
}
