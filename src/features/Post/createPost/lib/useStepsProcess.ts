import { useState } from 'react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setAppAlert } from '@/shared/model/appSlice'

import { StepsType } from '../ui/steps/steps.types'

export const useStepsProcess = <T extends StepsType>(
  steps: T[],
  titles: string[],
) => {
  const [currentStep, setCurrentStep] = useState(0)

  const [stepsState, setStepsState] = useState(Array(steps.length).fill(null))

  const dispatch = useAppDispatch()

  const handleOnOpenDraft = () => {
    const str = sessionStorage.getItem('draft')
    if (str) {
      setStepsState(JSON.parse(str))
      dispatch(
        setAppAlert({ type: 'success', message: 'Your draft is upload' }),
      )
    } else {
      dispatch(setAppAlert({ type: 'error', message: 'Your draft is empty' }))
    }
  }

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

  const handleDeleteImage = (inx: number, url: string) => {
    setStepsState((prevState) => {
      return prevState.map((obj, i) =>
        i === inx
          ? { urls: prevState[inx].urls.filter((el: string) => el !== url) }
          : obj,
      )
    })
  }

  const handleChangeStepsState = (inx: number, state: object) => {
    setStepsState((prevState) => {
      return prevState.map((obj, i) => (i === inx ? { ...obj, ...state } : obj))
    })
  }

  const CurrentStepComponent = steps[currentStep]
  const props = stepsState[currentStep]
  const currentTitle = titles[currentStep]

  return {
    handleNext,
    handleBack,
    handleChangeStepsState,
    CurrentStepComponent,
    props,
    currentStep,
    currentTitle,
    stepsState,
    handleOnOpenDraft,
    handleDeleteImage,
  }
}
