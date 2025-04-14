import { X } from 'lucide-react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setPrompt } from '@/shared/model/appSlice'
import { Button } from '@/shared/ui'

import styles from './Prompt.module.scss'

export type PromptVariant = 'cancel' | 'confirm'

export type PromptProps = {
  title: string
  message: string
  confirmText: string
  cancelText: string
  promptId: string
}

export const Prompt = ({
  message,
  title,
  confirmText,
  cancelText,
  promptId,
}: PromptProps) => {
  const dispatch = useAppDispatch()

  const handleOnCloseModal = () => {
    dispatch(setPrompt({ state: null, userChoice: null }))
  }

  const handleOnCancel = () => {
    dispatch(
      setPrompt({ state: null, userChoice: { isConfirmed: false, promptId } }),
    )
  }

  const handleOnConfirm = () => {
    dispatch(
      setPrompt({ state: null, userChoice: { isConfirmed: true, promptId } }),
    )
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>

          <X onClick={handleOnCloseModal} className={styles.closeButton} />
        </div>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          <div className={styles.buttonContainer}>
            <Button onClick={handleOnCancel} variant={'outline'}>
              {cancelText}
            </Button>
            <Button onClick={handleOnConfirm} variant={'default'}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
