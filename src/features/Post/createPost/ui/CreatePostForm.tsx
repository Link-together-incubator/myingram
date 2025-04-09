import { useEffect } from 'react'

import { useCreatePostMutation } from '@/entities/post/api/postApi'
import { saveDraft } from '@/features/Post/createPost/lib/indexedDBDraft'
import { zoomImageFile } from '@/features/Post/createPost/lib/zoomImageFile'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import {
  selectUserChoice,
  setAppAlert,
  setCreatePostModal,
  setPrompt,
} from '@/shared/model/appSlice'
import { Button } from '@/shared/ui'

import { isValidStep } from '../lib/isValidStep'
import { useStepsProcess } from '../lib/useStepsProcess'

import styles from './CreatePostForm.module.scss'
import { AddPhoto } from './steps/AddPhoto/AddPhoto.step'
import { CroppingPhotoStep } from './steps/CroppingPhoto/CroppingPhoto.step'
import { PublishPhotoStep } from './steps/PublishPhoto/PublishPhoto.step'
import { StepsType } from './steps/steps.types'

const steps: StepsType[] = [AddPhoto, CroppingPhotoStep, PublishPhotoStep]
const titles: string[] = ['Add photo', 'Cropping Photo', 'Publish Photo']
const PROMPT_ID = 'createPost'

export const CreatePostForm = () => {
  const {
    CurrentStepComponent,
    props,
    handleBack,
    handleChangeStepsState,
    handleNext,
    currentStep,
    currentTitle,
    stepsState,
    handleOnOpenDraft,
  } = useStepsProcess(steps, titles)

  const [createPost] = useCreatePostMutation()
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
    if (userChoice === null || userChoice.promptId !== PROMPT_ID) return

    const handleSave = async () => {
      if (userChoice.isConfirmed) {
        if (!stepsState.every((el) => el === null || el.urls.length === 0)) {
          try {
            await saveDraft(stepsState)
            dispatch(
              setAppAlert({
                message: 'The draft has been saved!',
                type: 'success',
              }),
            )
          } catch (err) {
            dispatch(
              setAppAlert({
                message: typeof err === 'string' ? err : 'Failed to save draft',
                type: 'error',
              }),
            )
          }
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
    }

    handleSave()
  }, [userChoice])

  const handleOnCreatePost = async () => {
    const urls: File[] = stepsState[stepsState.length - 1].urls
    const text = stepsState[stepsState.length - 1].postText
    const scales = stepsState[1].scales

    const formData = new FormData()

    try {
      const resizedFiles = await Promise.all(
        urls.map((url, inx) => {
          return zoomImageFile(url, scales[inx])
        }),
      )

      resizedFiles.forEach((file) => {
        formData.append(`files`, file)
      })

      formData.append('description', text)

      await createPost(formData)
      dispatch(setCreatePostModal(false))
      dispatch(
        setAppAlert({
          message: 'Post was created',
          type: 'success',
        }),
      )
    } catch (err) {
      console.log('Error post create', err)
    }
  }

  return (
    <div onClick={handleOnClose} className={styles.overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        style={
          currentStep === 2 ? { maxWidth: '1000px' } : { maxWidth: '520px' }
        }
      >
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
              disabled={!isValidStep(props, currentStep)}
              variant={'outline'}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              disabled={!isValidStep(props, currentStep)}
              variant={'outline'}
              onClick={handleOnCreatePost}
            >
              Create Post
            </Button>
          )}
        </div>
        <CurrentStepComponent
          setStepsState={handleChangeStepsState}
          handleOnOpenDraft={handleOnOpenDraft}
          handleBack={handleBack}
          handleNext={handleNext}
          {...props}
        />
      </div>
    </div>
  )
}
