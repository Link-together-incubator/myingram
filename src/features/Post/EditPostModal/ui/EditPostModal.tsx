import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button, Textarea } from '@/shared/ui'
import { ConfirmModal } from '@/shared/ui/ConfirmModal/ConfirmModal'
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ModalWrapper'

import { UserInfo } from '../../Post/UserInfo/UserInfo'

import s from './EditPostModal.module.scss'

type EditPostModalProps = {
  postId: string
  initialDescription: string
  photoUrls: string[]
  onClose: () => void
  userId: string
}

const MAX_LENGTH = 500

export const EditPostModal = ({
  initialDescription,
  userId,
  photoUrls,
  onClose,
}: EditPostModalProps) => {
  const [description, setDescription] = useState(initialDescription)
  const [showConfirm, setShowConfirm] = useState(false)
  return (
    <ModalWrapper
      onClose={onClose}
      className={s.modal}
      onOverlayClick={() => setShowConfirm(true)}
    >
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2 className={s.title}>Edit Post</h2>
          <button
            className={s.closeButton}
            onClick={() => setShowConfirm(true)}
          >
            <X size={24} color="white" />
          </button>
        </div>
        {showConfirm && (
          <ConfirmModal
            title="Close Post"
            message="Do you really want to close the edition of the publication? If you close, changes won’t be saved."
            onClose={() => setShowConfirm(false)}
            onConfirm={() => {
              setShowConfirm(false)
              onClose()
            }}
          />
        )}
        <div className={s.content}>
          <Image
            src={photoUrls[0] || ''}
            alt="Post image"
            width={490}
            height={503}
            className={s.img}
          />
          <div className={s.description}>
            <UserInfo username={userId} className={s.userInfo} />
            <Textarea
              className={s.textarea}
              label="Add publication descriptions"
              maxLength={MAX_LENGTH}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <div className={s.counter}>
              {description.length}/{MAX_LENGTH}
            </div>
            <Button variant={'default'} className={s.saveButton}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
