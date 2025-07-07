'use client'
import { X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { EditProfileForm } from '@/features/profile/editProfile/ui/EditProfileForm'
import { useDeleteAvatar } from '@/shared/lib/hooks/useDeleteAvatar'
import { setUploadAvatarModal } from '@/shared/model/appSlice'
import { Button } from '@/shared/ui'

import s from './GeneralInformation.module.scss'
import Image from 'next/image'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { useGetUserProfileQuery } from '@/entities/profile/api/profileApi'

export const GeneralInformation = () => {
  const { requestDelete } = useDeleteAvatar()
  const dispatch = useDispatch()

  const { data: authData } = useAuthMeQuery()
  const userId = authData?.id

  const { data: profile } = useGetUserProfileQuery(userId!, {
    skip: !userId,
  })

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
      <EditProfileForm profile={profile} />
    </div>
  )
}
