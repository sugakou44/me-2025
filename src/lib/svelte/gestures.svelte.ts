import { processMouseEvent } from './document.svelte'

import type { MouseState } from './document.svelte'

interface GestureState extends MouseState {
  isActive: boolean
  isHover: boolean
}

interface Gestures {
  onHover?: (gestureState: GestureState) => void
  onMove?: (gestureState: GestureState) => void
  onDrag?: (gestureState: GestureState) => void
  onLeave?: (gestureState: GestureState) => void
  onEnter?: (gestureState: GestureState) => void
}

type Node = HTMLElement | SVGSVGElement | Element

export function gestures<T extends EventTarget = Node>(options: Gestures) {
  return function gesturesAction(node: T) {
    let isActive = false
    let isHover = false
    let mouseState: MouseState | null = null

    function onPointerEnter(event: Event) {
      isHover = true

      mouseState = processMouseEvent(event as PointerEvent)

      if (options.onHover) {
        options.onHover({ ...mouseState, isActive, isHover })
      }
      if (options.onEnter) {
        options.onEnter({ ...mouseState, isActive, isHover })
      }
    }

    function onPointerLeave(event: Event) {
      isHover = false
      mouseState = processMouseEvent(event as PointerEvent)

      if (options.onHover) {
        options.onHover({ ...mouseState, isActive, isHover })
      }

      if (options.onLeave) {
        options.onLeave({ ...mouseState, isActive, isHover })
      }

      if (options.onMove) {
        options.onMove({ ...mouseState, isActive, isHover })
      }
    }

    function onPointerDown(event: Event) {
      isActive = true
      mouseState = processMouseEvent(event as PointerEvent)

      if (options.onDrag) {
        options.onDrag({ ...mouseState, isActive, isHover })
      }
    }

    function onPointerUp(event: Event) {
      isActive = false
      mouseState = processMouseEvent(event as PointerEvent)

      if (options.onDrag) {
        options.onDrag({ ...mouseState, isActive, isHover })
      }
    }

    function onPointerUpOutside() {
      if (!isActive) {
        return
      }

      isActive = false

      if (options.onDrag) {
        options.onDrag({ ...mouseState!, isActive, isHover })
      }
    }

    function onMove(event: Event) {
      mouseState = processMouseEvent(event as PointerEvent)

      event.preventDefault()
      event.stopPropagation()

      if (options.onMove) {
        options.onMove({ ...mouseState, isActive, isHover })
      }

      if (isActive && options.onDrag) {
        options.onDrag({ ...mouseState, isActive, isHover })
      }
    }

    node.addEventListener('pointerenter', onPointerEnter)
    node.addEventListener('pointerleave', onPointerLeave)
    node.addEventListener('pointerdown', onPointerDown)
    node.addEventListener('pointerup', onPointerUp)
    node.addEventListener('pointermove', onMove)

    document.addEventListener('pointerup', onPointerUpOutside)

    return () => {
      node.removeEventListener('pointerenter', onPointerEnter)
      node.removeEventListener('pointerleave', onPointerLeave)
      node.removeEventListener('pointerdown', onPointerDown)
      node.removeEventListener('pointerup', onPointerUp)
      node.removeEventListener('pointermove', onMove)

      document.removeEventListener('pointerup', onPointerUpOutside)
    }
  }
}
