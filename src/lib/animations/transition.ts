import { cubicOut } from 'svelte/easing'

import type { ScaleParams } from 'svelte/transition'

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

export function curtainOut(
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
