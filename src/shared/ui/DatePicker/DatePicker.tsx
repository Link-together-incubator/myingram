'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/css'
import { Calendar } from '@/shared/ui/Calendar/Calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/Popover/Popover'

import { Button } from '../Button/Button'

import s from './DataPicker.module.scss'

type Props = {
  selected?: Date
  onChange?: (date?: Date) => void
  error?: string
}

export function DatePicker({ selected, onChange, error }: Props) {
  return (
    <div className={s.datePickerWrapper}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'date'} className={cn(s.btn, error && s.error)}>
            {selected ? (
              <span>{format(selected, 'dd.MM.yyyy')}</span>
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="block h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onChange}
            initialFocus
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
      {error && <p className={s.errorMessage}>{error}</p>}
    </div>
  )
}
