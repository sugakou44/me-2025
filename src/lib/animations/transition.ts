import { cubicOut, linear } from 'svelte/easing'

import type { FadeParams, ScaleParams } from 'svelte/transition'

export function scaleY(
  node: HTMLElement,
  {
    delay = 0,
    duration = 400,
    easing = cubicOut,
    start = 0,
    opacity = 0,
  }: ScaleParams = {},
) {
  const style = getComputedStyle(node)
  const target_opacity = +style.opacity
  const transform = style.transform === 'none' ? '' : style.transform
  const sd = 1 - start
  const od = target_opacity * (1 - opacity)
  return {
    delay,
    duration,
    easing,
    css: (_: unknown, t: number) => `
			transform: ${transform} scaleY(${1 - sd * t});
			opacity: ${0.01 + (target_opacity - od * t)}
		`,
  }
}

export function fade(
  node: HTMLElement,
  { delay = 0, duration = 400, easing = linear }: FadeParams = {},
) {
  const o = +getComputedStyle(node).opacity
  return {
    delay,
    duration,
    easing,
    css: (t: number) => `opacity: ${0.001 + t * o}`,
  }
}
