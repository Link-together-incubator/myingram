'use client'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'

import { useGetUserProfileQuery } from '@/entities/profile/api/profileApi'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { EditProfileForm } from '@/features/profile/editProfile/ui/EditProfileForm'
import { useDeleteAvatar } from '@/shared/lib/hooks/useDeleteAvatar'
import { setUploadAvatarModal } from '@/shared/model/appSlice'
import { Button } from '@/shared/ui'

import s from './GeneralInformation.module.scss'

export const GeneralInformation = () => {
  const { data: authData } = useAuthMeQuery()
  const userId = authData?.id
  const { data: profile } = useGetUserProfileQuery(userId!, {
    skip: !userId,
  })
  console.log('profile', profile?.photoUrl)
  const { requestDelete } = useDeleteAvatar()
  const dispatch = useDispatch()

  return (
    <div className={s.generalInformation}>
      <div className={s.avatarContainer}>
        <div className={s.avatarWrapper}>
          {profile?.photoUrl && (
            <button className={s.deleteButton}>
              <X size={20} color="white" onClick={requestDelete} />
            </button>
          )}
          <Image
            className={s.avatarPhoto}
            width={192}
            height={192}
            src={profile?.photoUrl || '/assets/images/avatarPhoto.webp'}
            alt="avatar-photo"
          />
        </div>
        <Button
          onClick={() => dispatch(setUploadAvatarModal(true))}
          variant="outline"
        >
          Загрузить аватар
        </Button>
      </div>
      <EditProfileForm />
    </div>
  )
}
