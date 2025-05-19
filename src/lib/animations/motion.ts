import { Spring as SvelteSpring } from 'svelte/motion'

import type { SpringOptions } from './types'

interface Options extends SpringOptions {
  clamp?: boolean
}

export function Spring(initialValue: number, { clamp, ...options }: Options) {
  const spring = new SvelteSpring(initialValue, options)

  $effect.pre(() => {
    if (!clamp) {
      return
    }

    if (spring.current >= 1) {
      spring.set(1, {
        instant: true,
      })
    } else if (spring.current <= 0) {
      spring.set(0, {
        instant: true,
      })
    }
  })

  return spring
}
