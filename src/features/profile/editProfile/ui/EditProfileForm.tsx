'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import {
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} from '@/entities/profile/api/profileApi'
import {
  GeneralInformationData,
  GeneralInformationSchema,
} from '@/entities/profile/model/GeneralInformationSchem'
import { useAuthMeQuery } from '@/features/auth/api/authApi'
import { Button, DatePicker, Input, Textarea } from '@/shared/ui'
import { Separator } from '@/shared/ui/Separator/Separator'

import s from './editProfileForm.module.scss'

export const EditProfileForm = () => {
  const { data: authData } = useAuthMeQuery()
  const userId = authData?.id

  const { data: profile, refetch } = useGetUserProfileQuery(userId!, {
    skip: !userId,
  })
  const [editProfile] = useEditUserProfileMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<GeneralInformationData>({
    mode: 'onTouched',
    resolver: zodResolver(GeneralInformationSchema),
    defaultValues: {
      userName: profile?.userName || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      dateOfBirth: profile?.dateOfBirth || '',
      country: profile?.country || '',
      city: profile?.city || '',
      aboutMe: profile?.aboutMe || '',
    },
  })

  const onSubmit: SubmitHandler<GeneralInformationData> = async (formData) => {
    try {
      const payload = new FormData()
      payload.append('file', profile?.photoUrl || '')
      payload.append('userName', formData.userName || '')
      payload.append('firstName', formData.firstName || '')
      payload.append('lastName', formData.lastName || '')
      payload.append('dateOfBirth', formData.dateOfBirth || '')
      payload.append('country', formData.country || '')
      payload.append('city', formData.city || '')
      payload.append('aboutMe', formData.aboutMe || '')

      await editProfile(payload).unwrap()
    } catch (e) {
      console.log(`Error ${e}`)
    }
  }

  return (
    <form className={s.informationFields} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={'Username*'}
        error={errors.userName && errors.userName.message}
        {...register('userName')}
      />
      <Input
        label={'First Name*'}
        error={errors.firstName && errors.firstName.message}
        {...register('firstName')}
      />
      <Input
        label={'Last Name*'}
        error={errors.lastName && errors.lastName.message}
        {...register('lastName')}
      />

      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value ? new Date(field.value) : undefined}
            onChange={(date) => field.onChange(date?.toISOString())}
            error={errors.dateOfBirth && errors.dateOfBirth.message}
          />
        )}
      />

      <div className={s.location}>
        <Input
          className={s.locationInput}
          label={'Select your country'}
          {...register('country')}
        />
        <Input
          className={s.locationInput}
          label={'Select your city'}
          {...register('city')}
        />
      </div>

      <Textarea
        label={'About Me'}
        placeholder={'Text-area'}
        error={errors.aboutMe && errors.aboutMe.message}
        {...register('aboutMe')}
      />

      <Separator />

      <Button className={s.sendBtn} variant={'default'} type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
