import {
  AddPhotoProps,
  CroppingPhotoProps,
  PublishPhotoProps,
} from '../ui/steps/steps.types'

export const isValidStep = (
  state: AddPhotoProps | CroppingPhotoProps | PublishPhotoProps,
  stepIndex: number,
): boolean => {
  console.log('VALIDATOR', state, stepIndex)
  if (state === null) return false
  if (!Array.isArray(state.urls) || state.urls.length === 0) {
    return false
  }
  const areAllUrlsStrings = state.urls.every((url) => typeof url === 'string')
  if (!areAllUrlsStrings) {
    return false
  }
  switch (stepIndex) {
    case 0:
      return true

    case 1:
      return true
    case 2:
      return 'postText' in state && typeof state.postText === 'string'

    default:
      throw new Error('Несуществующий шаг')
  }
}
