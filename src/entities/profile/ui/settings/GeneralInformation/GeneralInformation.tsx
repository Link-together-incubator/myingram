'use client'
import s from './GeneralInformation.module.scss'
import {EditProfileForm} from "@/features/profile/editProfile/ui/EditProfileForm";
import {useAuthMeQuery} from "@/features/auth/api/authApi";
import {useGetUserProfileQuery} from "@/entities/profile/api/profileApi";
import {Button} from "@/shared/ui";
import {setUploadAvatarModal} from "@/shared/model/appSlice";
import {useDispatch} from "react-redux";


export const GeneralInformation = () => {
  const { data: authData } = useAuthMeQuery()
  const userId = authData?.id
  const { data: profile} = useGetUserProfileQuery(userId!, {
    skip: !userId,
  })
    const dispatch = useDispatch()

  return (
      <div className={s.generalInformation}>
        <div className={s.avatarContainer}>
          <img className={s.avatarPhoto} width={192} height={192} src={profile?.photoUrl || '/assets/images/avatarPhoto.webp'} alt="avatar-photo"/>
            <Button
                onClick={() => dispatch(setUploadAvatarModal(true))}
                variant="outline"
            >
                Загрузить аватар
            </Button>
        </div>
        <EditProfileForm/>
      </div>
  )
}
