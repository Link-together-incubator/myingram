'use client'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { useUpdatePostMutation } from '@/entities/post/api/postApi'
import { UserProfile } from '@/entities/profile/model/profile.types'
import { Button, Textarea } from '@/shared/ui'
import { ConfirmModal } from '@/shared/ui/ConfirmModal/ConfirmModal'
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ModalWrapper'

import { UserInfo } from '../../../../entities/post/ui/UserInfo/ui/UserInfo'

import s from './EditPostModal.module.scss'

type EditPostModalProps = {
  postId: string
  initialDescription: string
  photoUrls: string[]
  onClose: () => void
  profile: UserProfile
}

const MAX_LENGTH = 500

export const EditPostModal = ({
  initialDescription,
  photoUrls,
  onClose,
  profile,
  postId,
}: EditPostModalProps) => {
  const [description, setDescription] = useState(initialDescription)
  const [showConfirm, setShowConfirm] = useState(false)
  const isChanged = description !== initialDescription

  const [updatePost] = useUpdatePostMutation()

  const handleClose = () => {
    if (isChanged) {
      setShowConfirm(true)
    } else {
      onClose()
    }
  }

  const handleSave = async () => {
    try {
      await updatePost({ postId, description })
      onClose()
    } catch (err) {
      console.error('Ошибка при обновлении поста:', err)
    }
  }
  return (
    <ModalWrapper
      onClose={onClose}
      className={s.modal}
      onOverlayClick={() => handleClose()}
    >
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2 className={s.title}>Edit Post</h2>
          <button className={s.closeButton} onClick={() => handleClose()}>
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
            <UserInfo
              username={profile.userName}
              className={s.userInfo}
              profileImage={profile.photoUrl}
            />
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
            <Button
              variant={'default'}
              className={s.saveButton}
              onClick={handleSave}
              disabled={!description.trim()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}
