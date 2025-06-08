'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

import {
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} from '@/entities/profile/api/profileApi'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { setAppAlert, setUploadAvatarModal } from '@/shared/model/appSlice'
import { ModalWrapper } from '@/shared/ui/ModalWrapper/ModalWrapper'

import { AddAvatar } from './steps/AddAvatar/AddAvatar'
import { CroppingAvatar } from './steps/CroppingAvatar/CroppingAvatar'
import s from './UploadAvatarForm.module.scss'

export const UploadAvatarForm = () => {
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  console.log('UploadAvatarForm rendered, selectedFile:', selectedFile)
  const [editUserProfile] = useEditUserProfileMutation()

  const { data: authData } = useAuthMeQuery()
  const userId = authData?.id

  const { data: profile, refetch } = useGetUserProfileQuery(userId!, {
    skip: !userId,
  })

  const handleFileSelected = (file: File) => {
    setSelectedFile(file)
  }

  const handleCropComplete = async (croppedImage: Blob) => {
    console.log('croppedImage: ', croppedImage)
    console.log('Cropped blob size:', croppedImage.size)
    if (!profile) return
    const formData = new FormData()
    formData.append('file', croppedImage, 'avatar.jpg')
    formData.append('userName', profile.userName || '')
    formData.append('firstName', profile.firstName || '')
    formData.append('lastName', profile.lastName || '')
    formData.append('dateOfBirth', profile.dateOfBirth || '')
    formData.append('country', profile.country || '')
    formData.append('city', profile.city || '')
    formData.append('aboutMe', profile.aboutMe || '')
    console.log('formData: ', formData)
    formData.getAll('file')
    console.log('formData.getAll("file"): ', formData.getAll('file'))
    try {
      const test = await editUserProfile(formData).unwrap()
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await refetch()
      console.log('test: ', test)
      console.log('profile?.photoUrl', profile?.photoUrl)
      dispatch(setUploadAvatarModal(false))
      dispatch(
        setAppAlert({ type: 'success', message: 'Profile photo added!' }),
      )
    } catch (error) {
      dispatch(
        setAppAlert({
          message:
            typeof error === 'string' ? error : 'Failed to upload avatar',
          type: 'error',
        }),
      )
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
        {selectedFile ? (
          <CroppingAvatar
            imageSrc={URL.createObjectURL(selectedFile)}
            onCropComplete={handleCropComplete}
          />
        ) : (
          <AddAvatar onFileSelected={handleFileSelected} />
        )}
      </div>
    </ModalWrapper>
  )
}
