import { useState } from 'react'

import { Button } from '@/shared/ui'

import { Step1 } from './steps/Step1.step'
import { Step2 } from './steps/Step2.step'
import { Step3 } from './steps/Step3.step'

const steps = [Step1, Step2, Step3]

export const CreatePostForm = () => {
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

  const handleChangeStepsState = (inx: number, state: object) => {
    setStepsState((prevState) => {
      return prevState.map((obj, i) => {
        if (i === inx) {
          return state
        } else {
          return obj
        }
      })
    })
  }

  const CurrentStepComponent = steps[currentStep]
  const props = stepsState[currentStep]
  console.log(props)

  return (
    <div>
      <div className="flex max-w-[500px] justify-between">
        {currentStep <= 0 ? (
          <Button variant={'outline'}>Cancel</Button>
        ) : (
          <Button variant={'outline'} onClick={handleBack}>
            Back
          </Button>
        )}
        <p>
          {currentStep + 1} / {steps.length}
        </p>
        {currentStep < steps.length - 1 ? (
          <Button disabled={!isValid} variant={'outline'} onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button disabled={!isValid} variant={'outline'}>
            Create Post
          </Button>
        )}
      </div>
      <CurrentStepComponent
        setIsValid={setIsValid}
        setStepsState={handleChangeStepsState}
        stepIndex={currentStep}
        {...props}
      />
    </div>
  )
}
