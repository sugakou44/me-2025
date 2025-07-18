import { utils } from 'animejs'
import { innerHeight, scrollY } from 'svelte/reactivity/window'

import { centerPointOrigin } from '@/lib/utils/math'

export function useDocumentScrollProgress() {
  const { position, progress } = $derived.by(() => {
    if (typeof document === 'undefined') {
      return {
        position: 0,
        progress: 0,
      }
    }
    const scrollHeight = document.documentElement.scrollHeight ?? 0
    const position = scrollY.current ?? 0
    const progress = position / (scrollHeight - (innerHeight.current ?? 0))

    return {
      position,
      progress,
    }
  })

  return () => ({
    position,
    progress,
  })
}

export function processMouseEvent(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement
  const bound =
    target === (window as unknown as HTMLElement)
      ? { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }
      : target.getBoundingClientRect()

  const [centerX, centerY] = centerPointOrigin(
    [bound.x, bound.y],
    [Math.floor(bound.width / 2), Math.floor(bound.height / 2)],
  )

  return {
    xy: [event.x, event.y] as Point2d,
    local: [event.clientX - bound.x, event.clientY - bound.y] as Point2d,
    movement: [event.movementX, event.movementY] as Point2d,
    offset: [event.offsetX, event.offsetY] as Point2d,
    page: [event.pageX, event.pageY] as Point2d,
    percentage: [
      utils.clamp((event.clientX - bound.x) / bound.width, 0, 1),
      utils.clamp((event.clientY - bound.y) / bound.height, 0, 1),
    ] as Point2d,
    fromCenter: [event.x - centerX, event.y - centerY] as Point2d,
    button: event.button,
    bound: {
      ...bound,
      centerX,
      centerY,
    },
    target,
    event,
  }
}

export type MouseState = ReturnType<typeof processMouseEvent>
