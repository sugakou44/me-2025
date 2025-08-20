import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function toggleClass(
  node: Element,
  classNames: string,
  force?: boolean,
) {
  classNames.split(' ').forEach((token) => {
    node.classList.toggle(token, force)
  })
}
