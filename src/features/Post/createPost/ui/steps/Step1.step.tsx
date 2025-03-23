import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@/shared/ui'

import { BasicStepProps } from './steps.types'

type StepProps = {
  text: string
}

type Step1Props = BasicStepProps<StepProps> & StepProps

export const Step1 = ({
  setIsValid,
  setStepsState,
  stepIndex,
  text,
}: Step1Props) => {
  const {
    register,
    watch,
    formState: { isValid },
  } = useForm({ defaultValues: { text } })

  useEffect(() => {
    console.log('STEPS', isValid)
    setIsValid(isValid)
  }, [isValid])

  useEffect(() => {
    return () => {
      const inputValue = watch('text')
      console.log(inputValue)
      // в объект кидаешь что хочешь
      setStepsState(stepIndex, { text: inputValue })
    }
  }, [])

  return (
    <div>
      <Input
        variant="search"
        type="text"
        {...register('text', {
          required: { message: 'required', value: true },
        })}
      />
    </div>
  )
}
