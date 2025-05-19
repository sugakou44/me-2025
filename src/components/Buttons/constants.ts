import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils/className'

import type { VariantProps } from 'tailwind-variants'

export const buttonVariants = tv({
  base: cn(
    'relative inline-flex cursor-pointer items-center justify-center rounded-full font-mono font-medium whitespace-nowrap ring-offset-background transition-all duration-150',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-70',
  ),
  variants: {
    variant: {
      default: cn(
        'border border-current bg-background text-primary-foreground shadow-[0.125rem_0.125rem_var(--color-primary)]',
        'hover:bg-primary-foreground hover:text-background',
        'active:translate-x-[0.125rem] active:translate-y-[0.125rem] active:shadow-[0rem_0rem_var(--color-primary)]',
      ),
      secondary: cn(
        'border border-current bg-background text-secondary-foreground shadow-[0.125rem_0.125rem_var(--color-secondary)]',
        'hover:bg-secondary-foreground hover:text-background',
        'active:translate-x-[0.125rem] active:translate-y-[0.125rem] active:shadow-[0rem_0rem_var(--color-secondary)]',
      ),
      tertiary: cn(
        'border border-current bg-background text-tertiary-foreground shadow-[0.125rem_0.125rem_var(--color-tertiary)]',
        'hover:bg-tertiary-foreground hover:text-background',
        'active:translate-x-[0.125rem] active:translate-y-[0.125rem] active:shadow-[0rem_0rem_var(--color-tertiary)]',
      ),
      solid: cn(
        'bg-primary/50 text-primary-foreground shadow-[0.125rem_0.125rem_var(--color-primary-foreground)]',
        'hover:bg-primary-foreground/80 hover:text-background',
        'active:translate-x-[0.125rem] active:translate-y-[0.125rem] active:shadow-[0rem_0rem_var(--color-primary)]',
      ),
      'solid-secondary': cn(
        'bg-secondary/50 text-secondary-foreground shadow-[0.125rem_0.125rem_var(--color-secondary-foreground)]',
        'hover:bg-secondary-foreground/80 hover:text-background',
        'active:translate-x-[0.125rem] active:translate-y-[0.125rem] active:shadow-[0rem_0rem_var(--color-secondary)]',
      ),
      'solid-tertiary': cn(
        'bg-tertiary/50 text-tertiary-foreground shadow-[0.125rem_0.125rem_var(--color-tertiary-foreground)]',
        'hover:bg-tertiary-foreground/80 hover:text-background',
        'active:translate-x-[0.125rem] active:translate-y-[0.125rem] active:shadow-[0rem_0rem_var(--color-tertiary)]',
      ),
      ghost: 'hover:bg-primary/20 hover:text-primary-foreground',
      'ghost-secondary':
        'hover:bg-secondary/20 hover:text-secondary-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      puller: cn(
        'bg-primary text-background',
        'hover:translate-y-2 hover:bg-primary/60 hover:text-background',
        'active:shadow-inset active:translate-y-4',
      ),
      destructive:
        'text-destructive-foreground bg-destructive hover:bg-destructive/90',
    },
    size: {
      default: 'h-8 px-4 py-2 md:h-10',
      sm: 'h-8 px-3 text-sm md:h-10',
      lg: 'h-10 px-4 py-2 md:h-12 md:text-lg lg:text-xl',
      xl: 'h-12 px-8 md:h-14 md:text-lg lg:text-xl',
      icon: 'aspect-square h-10 w-10 md:h-12 md:w-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export type Variant = VariantProps<typeof buttonVariants>['variant']
export type Size = VariantProps<typeof buttonVariants>['size']
