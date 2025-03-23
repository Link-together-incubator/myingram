export type BasicStepProps<T = object> = {
  setIsValid: (isValid: boolean) => void
  setStepsState: (stepIndex: number, state: T) => void
  stepIndex: number
}
