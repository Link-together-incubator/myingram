'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useEditUserProfilePatchMutation } from '@/entities/profile/api/profileApi'
import {
  GeneralInformationData,
  GeneralInformationSchema,
} from '@/entities/profile/model/GeneralInformationSchem'
import { UserProfile } from '@/entities/profile/model/profile.types'
import { Button, DatePicker, Input, Textarea } from '@/shared/ui'
import { Separator } from '@/shared/ui/Separator/Separator'

import s from './editProfileForm.module.scss'

type Props = {
  profile: UserProfile | undefined
}

export const EditProfileForm = ({ profile }: Props) => {
  const [editProfile] = useEditUserProfilePatchMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<GeneralInformationData>({
    mode: 'onTouched',
    resolver: zodResolver(GeneralInformationSchema),
    defaultValues: {
      userName: profile?.userName || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      dateOfBirth: profile?.dateOfBirth || undefined,
      country: profile?.country || '',
      city: profile?.city || '',
      aboutMe: profile?.aboutMe || '',
    },
  })

  useEffect(() => {
    reset({
      userName: profile?.userName || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      dateOfBirth: profile?.dateOfBirth || undefined,
      country: profile?.country || '',
      city: profile?.city || '',
      aboutMe: profile?.aboutMe || '',
    })
  }, [profile, reset])

  const onSubmit: SubmitHandler<GeneralInformationData> = async (data) => {
    try {
      await editProfile(data).unwrap()
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
