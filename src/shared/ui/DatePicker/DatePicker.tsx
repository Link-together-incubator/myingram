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

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'date'}
          className={cn(
            'w-[158px] h-[36px] justify-start text-left font-normal ',
            !date && 'text-muted-foreground',
          )}
        >
          {date ? format(date, 'dd/MM/yyyy') : <span>Pick a date</span>}
          <CalendarIcon className=" h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
