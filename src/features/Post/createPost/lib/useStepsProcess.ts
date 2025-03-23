import { useState } from 'react'

import { StepsType } from '../ui/steps/steps.types'

export const useStepsProcess = <T extends StepsType>(
  steps: T[],
  titles: string[],
) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isValid, setIsValid] = useState(false)
  const [stepsState, setStepsState] = useState(Array(steps.length).fill(null))

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChangeStepsState = function (inx: number, state: object) {
    setStepsState((prevState) => {
      return prevState.map((obj, i) => (i === inx ? state : obj))
    })
  }.bind(null, currentStep)

  const CurrentStepComponent = steps[currentStep]
  const props = stepsState[currentStep]
  const currentTitle = titles[currentStep]

  return {
    isValid,
    setIsValid,
    handleNext,
    handleBack,
    handleChangeStepsState,
    CurrentStepComponent,
    props,
    currentStep,
    currentTitle,
  }
}
