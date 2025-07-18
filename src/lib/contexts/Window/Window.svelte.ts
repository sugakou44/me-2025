import { innerHeight, scrollY } from 'svelte/reactivity/window'
import { Clock } from 'three'

const END_THRESHOLD = 22

const clock = new Clock()

class WindowState {
  scrollHeight = $derived(innerHeight.current ?? Infinity)
  scrollPosition = $derived.by(() => {
    const currentValue = scrollY.current ?? 0

    this.previousScrollPositions.push(currentValue)
    while (this.previousScrollPositions.length > 2) {
      this.previousScrollPositions.shift()
    }

    return currentValue
  })
  previousScrollPositions: number[] = []
  get previousScrollPosition() {
    return this.previousScrollPositions[0]
  }

  get scrollDirection() {
    return Math.sign(this.scrollPosition - this.previousScrollPosition)
  }
  get scrollVelocity() {
    const dt = clock.getDelta() || 1
    const diff = Math.abs(this.scrollPosition - this.previousScrollPosition)

    return diff / dt
  }

  scrollPercent = $derived(this.scrollPosition / this.scrollHeight)

  isAtTop = $derived((scrollY.current ?? Infinity) <= END_THRESHOLD)
  isAtBottom = $derived(
    (scrollY.current ?? Infinity) >= this.scrollHeight - END_THRESHOLD,
  )
}

export const windowState = new WindowState()
