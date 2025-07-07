'use client'

import { X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import {
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} from '@/entities/profile/api/profileApi'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setUploadAvatarModal } from '@/shared/model/appSlice'
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ModalWrapper'

import { AddAvatar } from './steps/AddAvatar/AddAvatar'
import { CroppingAvatar } from './steps/CroppingAvatar/CroppingAvatar'
import s from './UploadAvatarForm.module.scss'

export const UploadAvatarForm = () => {
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [editUserProfile] = useEditUserProfileMutation()

  const imageSrc = useMemo(() => {
    if (!selectedFile) return null
    return URL.createObjectURL(selectedFile)
  }, [selectedFile])

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc)
      }
    }
  }, [imageSrc])

  const { data: authData } = useAuthMeQuery()
  const userId = authData?.id

  const { data: profile } = useGetUserProfileQuery(userId!, {
    skip: !userId,
  })

  const handleFileSelected = (file: File) => {
    setSelectedFile(file)
  }

  const handleCropComplete = async (croppedImage: Blob) => {
    try {
      const uniqueFileName = `avatar-${Date.now()}.jpg`
      const formData = new FormData()
      const file = new File([croppedImage], uniqueFileName, {
        type: 'image/jpeg',
      })
      formData.append('file', file)

      formData.append('userName', profile?.userName || '')
      formData.append('firstName', profile?.firstName || '')
      formData.append('lastName', profile?.lastName || '')
      formData.append('dateOfBirth', profile?.dateOfBirth || '')
      formData.append('country', profile?.country || '')
      formData.append('city', profile?.city || '')
      formData.append('aboutMe', profile?.aboutMe || '')

      await editUserProfile(formData).unwrap()
      dispatch(setUploadAvatarModal(false))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCloseAvatarModal = () => {
    dispatch(setUploadAvatarModal(false))
  }

  return (
    <ModalWrapper onClose={handleCloseAvatarModal}>
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.title}>Add a Profile Photo</span>{' '}
          <button className={s.closeButton} onClick={handleCloseAvatarModal}>
            <X size={24} color="white" />
          </button>
        </div>
        {selectedFile && imageSrc ? (
          <CroppingAvatar
            imageSrc={imageSrc}
            onCropComplete={handleCropComplete}
          />
        ) : (
          <AddAvatar onFileSelected={handleFileSelected} />
        )}
      </div>
    </ModalWrapper>
  )
}
