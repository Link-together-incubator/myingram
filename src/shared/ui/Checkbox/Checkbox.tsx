'use client'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/lib/css'

type Props = {
  id: string
  label?: string | React.ReactNode
  className?: string
} & React.ComponentProps<typeof CheckboxPrimitive.Root>

function Checkbox({ className, id, label, ...props }: Props) {
  return (
    <label
      htmlFor={id}
      className={cn('items-top flex gap-2 text-sm text-secondary-foreground ')}
    >
      <CheckboxPrimitive.Root
        id={id}
        data-slot="checkbox"
        className={cn(
          'peer cursor-pointer border-secondary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-background data-[state=checked]:border-foreground-3 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-6 shrink-0 border-3 shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          <CheckIcon className="size-5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label}
    </label>
  )
}

export { Checkbox }
