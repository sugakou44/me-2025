import { Spring as SvelteSpring, Tween as SvelteTween } from 'svelte/motion'

import { DEFAULT_SPRING_CONFIG } from './constants'

import type {
  ExtendedTween,
  SpringOptions as SpringConfig,
  TweenedOptions,
} from './types'

interface SpringOptions extends SpringConfig {
  clamp?: boolean
}

export function Spring(
  initialValue: number,
  { clamp, ...options }: SpringOptions = DEFAULT_SPRING_CONFIG,
) {
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

export function ChainTween(
  initialValue: number,
  defaultOptions?: TweenedOptions<number>,
) {
  const tween = new SvelteTween(
    initialValue,
    defaultOptions,
  ) as ExtendedTween<number>

  tween.setChain = async function (
    values: number[],
    options?: TweenedOptions<number>[],
  ) {
    let index = 0

    while (index < values.length) {
      const value = values[index]
      const option =
        options &&
        (values.length !== options.length
          ? (options[0] ?? defaultOptions)
          : options[index])

      await tween.set(value, option)

      index++
    }
  }

  return tween
}
