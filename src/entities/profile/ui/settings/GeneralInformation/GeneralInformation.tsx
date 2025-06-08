import s from './GeneralInformation.module.scss'
import { Button, DatePicker, Input, Textarea } from '@/shared/ui'
import { Separator } from '@/shared/ui/Separator/Separator'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  GeneralInformationData,
  GeneralInformationSchema,
} from '@/entities/profile/model/GeneralInformationSchem'
import { useEditProfileMutation } from '@/entities/profile/api/profileApi'

export const GeneralInformation = () => {
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
  })

  const [editProfile] = useEditProfileMutation()

  const onSubmit: SubmitHandler<GeneralInformationData> = async (formData) => {
    console.log(formData)

    try {
      await editProfile(formData).unwrap()
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
