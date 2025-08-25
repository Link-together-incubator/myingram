import { useEffect } from 'react'

import {
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} from '@/entities/profile/api/profileApi'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import {
  setPrompt,
  selectUserChoice,
  setAppAlert,
} from '@/shared/model/appSlice'

const PROMPT_ID = 'deleteAvatar'

export const useDeleteAvatar = () => {
  const dispatch = useAppDispatch()
  const [editUserProfile] = useEditUserProfileMutation()
  const { data: auth } = useAuthMeQuery()
  const userId = auth?.id
  const { data: profile, refetch } = useGetUserProfileQuery(userId!, {
    skip: !userId,
  })
  const userChoice = useAppSelector(selectUserChoice)

  const requestDelete = () => {
    dispatch(
      setPrompt({
        state: {
          promptId: PROMPT_ID,
          title: 'Delete photo',
          message: 'Do you really want to delete your profile photo?',
          cancelText: 'No',
          confirmText: 'Yes',
        },
        userChoice: null,
      }),
    )
  }

  useEffect(() => {
    if (userChoice?.promptId !== PROMPT_ID) return

    const deletePhoto = async () => {
      try {
        const formData = new FormData()
        const emptyFile = new File([''], 'empty.jpg', { type: 'image/jpeg' })
        formData.append('file', emptyFile)
        formData.append('userName', profile?.userName || '')
        formData.append('firstName', profile?.firstName || '')
        formData.append('lastName', profile?.lastName || '')
        formData.append('dateOfBirth', profile?.dateOfBirth || '')
        formData.append('country', profile?.country || '')
        formData.append('city', profile?.city || '')
        formData.append('aboutMe', profile?.aboutMe || '')

        if (userChoice.isConfirmed) {
          await editUserProfile(formData).unwrap()
          await refetch()
          dispatch(setAppAlert({ message: 'Photo deleted', type: 'success' }))
        }
      } catch (err) {
        console.log(err)
        dispatch(
          setAppAlert({ message: 'Failed to delete photo', type: 'error' }),
        )
      } finally {
        dispatch(setPrompt({ state: null, userChoice: null }))
      }
    }

    deletePhoto()
  }, [userChoice])

  return { requestDelete }
}
