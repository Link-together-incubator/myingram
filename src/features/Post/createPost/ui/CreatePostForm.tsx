import { useEffect } from 'react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import {
  selectUserChoice,
  setAppAlert,
  setCreatePostModal,
  setPrompt,
} from '@/shared/model/appSlice'
import { Button } from '@/shared/ui'

import { useStepsProcess } from '../lib/useStepsProcess'

import styles from './CreatePostForm.module.scss'
import { AddPhoto } from './steps/AddPhoto/AddPhoto.step'
import { Step2 } from './steps/Step2.step'
import { Step3 } from './steps/Step3.step'
import { StepsType } from './steps/steps.types'

const steps: StepsType[] = [AddPhoto, Step2, Step3]
const titles: string[] = ['Add photo', 'Step1', 'Step2']
const PROMPT_ID = 'createPost'

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
    stepsState,
    handleOnOpenDraft,
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
          promptId: PROMPT_ID,
        },
        userChoice: null,
      }),
    )
  }

  const userChoice = useAppSelector(selectUserChoice)

  useEffect(() => {
    if (userChoice === null || userChoice?.promptId !== PROMPT_ID) return

    if (userChoice.isConfirmed) {
      if (!stepsState.every((el) => el === null)) {
        sessionStorage.setItem('draft', JSON.stringify(stepsState))
        dispatch(
          setAppAlert({
            message: 'The draft has been saved!',
            type: 'success',
          }),
        )
      } else {
        dispatch(
          setAppAlert({
            message: 'Your form is empty',
            type: 'classic',
          }),
        )
      }
    }
    dispatch(setCreatePostModal(false))

    dispatch(setPrompt({ state: null, userChoice: null }))
  }, [userChoice])
  console.log(stepsState)

  return (
    <div onClick={handleOnClose} className={styles.overlay}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
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
          handleOnOpenDraft={handleOnOpenDraft}
          {...props}
        />
      </div>
    </div>
  )
}
