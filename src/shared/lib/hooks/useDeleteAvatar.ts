import { useEffect } from 'react'

import {
  useDeleteUserAvatarMutation,
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
  const [deleteAvatar] = useDeleteUserAvatarMutation()
  const { data: auth } = useAuthMeQuery()
  const userId = auth?.id
  const { refetch } = useGetUserProfileQuery(userId!, {
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
        if (userChoice.isConfirmed && userId) {
          await deleteAvatar().unwrap()
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
