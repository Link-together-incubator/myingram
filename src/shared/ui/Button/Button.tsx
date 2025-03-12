import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/lib/css'

import s from './Button.module.scss'

export const buttonVariants = cva(s.button, {
  variants: {
    variant: {
      default: s.default,
      secondary: s.secondary,
      outline: s.outline,
      link: s.link,
      date: s.date,
    },
    disabled: {
      true: s.disabled,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type ButtonProps = {
  variant: VariantProps<typeof buttonVariants>['variant']
  asChild?: boolean
  disabled?: boolean
  href?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
} & React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>

export const Button = ({
  variant,
  asChild = false,
  children,
  disabled,
  onClick,
  className,
  href,
  ...props
}: ButtonProps) => {
  const isLink = variant === 'link'

  const Comp = asChild ? Slot : isLink ? 'a' : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, disabled }), className)}
      disabled={!isLink && disabled}
      onClick={disabled ? undefined : onClick}
      href={isLink ? href : undefined}
      {...props}
    >
      {children}
    </Comp>
  )
}
