import { X } from 'lucide-react'

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setIsShowEmailSentModal } from '@/shared/model/appSlice'
import { Button } from '@/shared/ui'

import styles from './SuccessEmailSent.module.scss'

interface SuccessEmailSentProps {
  message: string
  title: string
}

export function SuccessEmailSent({ message, title }: SuccessEmailSentProps) {
  const dispatch = useAppDispatch()

  const handleOnCloseModal = () => {
    dispatch(setIsShowEmailSentModal(null))
  }

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div onClick={handleOnCloseModal} className={styles.overlay}>
      <div onClick={stopPropagation} className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>

          <X onClick={handleOnCloseModal} className={styles.closeButton} />
        </div>
        <div className={styles.content}>
          <p className={styles.message}>{message}</p>
          <div className={styles.buttonContainer}>
            <Button onClick={handleOnCloseModal} variant={'default'}>
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
