import { useEffect } from 'react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { selectUserChoice, setPrompt } from '@/shared/model/appSlice'
import { Button } from '@/shared/ui'

import { useStepsProcess } from '../lib/useStepsProcess'

import styles from './CreatePostForm.module.scss'
import { AddPhoto } from './steps/AddPhoto/AddPhoto.step'
import { Step2 } from './steps/Step2.step'
import { Step3 } from './steps/Step3.step'
import { StepsType } from './steps/steps.types'

const steps: StepsType[] = [AddPhoto, Step2, Step3]
const titles: string[] = ['Add photo', 'Step1', 'Step2']

export const CreatePostForm = () => {
  const {
    CurrentStepComponent,
    props,
    handleBack,
    handleChangeStepsState,
    handleNext,
    isValid,
    setIsValid,
    currentStep,
    currentTitle,
  } = useStepsProcess(steps, titles)

  const dispatch = useAppDispatch()

  const handleOnClose = () => {
    dispatch(
      setPrompt({
        state: {
          cancelText: 'Discard',
          confirmText: 'Save draft',
          message:
            'Do you really want to close the creation of a publication? If you close everything will be deleted',
          title: 'Close',
        },
        userChoice: null,
      }),
    )
  }

  const userChoice = useAppSelector(selectUserChoice)

  useEffect(() => {
    if (userChoice === null) return

    if (userChoice) {
      console.log('Пользователь подтвердил')
    } else {
      console.log('Пользователь отменил')
    }

    dispatch(setPrompt({ state: null, userChoice: null }))
  }, [userChoice])

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {currentStep <= 0 ? (
            <Button onClick={handleOnClose} variant={'outline'}>
              Cancel
            </Button>
          ) : (
            <Button variant={'outline'} onClick={handleBack}>
              Back
            </Button>
          )}
          <h2 className={styles.title}>{currentTitle}</h2>
          {currentStep < steps.length - 1 ? (
            <Button
              disabled={!isValid}
              variant={'outline'}
              onClick={handleNext}
            >
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
          {...props}
        />
      </div>
    </div>
  )
}
