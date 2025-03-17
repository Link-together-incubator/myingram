'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { useAppSelector } from '@/shared/hooks/useAppSelector'
import { cn } from '@/shared/lib/css'
import { selectStatusRequest } from '@/shared/model/appSlice'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setValue((prev) => (prev === 100 ? 0 : prev + 20))
    }, 500)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'fixed h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20 z-[1000]',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-muted-foreground transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export function ProgressBar() {
  const status = useAppSelector(selectStatusRequest)

  return status === 'loading' && <Progress />
}
