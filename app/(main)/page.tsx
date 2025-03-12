'use client'

import { useId } from 'react'

import {
  Checkbox,
  DatePicker,
  DateRangePicker,
  Input,
  Pagination,
  RecaptchaForm,
  Card
  SelectBox,
} from '@/shared/ui'

export default function Home() {
  const checkBoxId1 = useId()
  const checkBoxId2 = useId()
  const checkBoxId3 = useId()

  return (
    <div
      className={`flex gap-72 flex-col pt-[80px] px-9 mx-auto w-full max-w-[1180px]`}
    >
      <Pagination totalItems={101} />
      <div className="flex gap-4">
        <Checkbox id={checkBoxId1} />
        <Checkbox id={checkBoxId2} />
        <Checkbox id={checkBoxId3} />
      </div>
      <RecaptchaForm />
      <Card/>
      <RadioGroup
        options={[
          { label: 'RadioGroup', value: 'r1' },
          { label: 'RadioGroup', value: 'r2' },
        ]}
      />
      <SelectBox
        placeholder={'Select-box'}
        label={'Select-box'}
        options={[
          { id: 'Select-box1', value: 'Select-box1', title: 'Select-box1' },
        ]}
      />
      <Input type="search" />
      <DateRangePicker />
      <DatePicker />
    </div>
  )
}
