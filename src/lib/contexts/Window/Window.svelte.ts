import { page } from '$app/state'
import { innerHeight, innerWidth, scrollY } from 'svelte/reactivity/window'
import { Clock } from 'three'

const END_THRESHOLD = 88

const clock = new Clock()

class WindowState {
  previousPathnames: string[] = []
  pathname = $derived.by(() => {
    const url = page.url

    while (this.previousPathnames.length > 1) {
      this.previousPathnames.shift()
    }
    this.previousPathnames.push(url.pathname)

    return url.pathname
  })
  previousPathname = $derived.by(() => {
    const currentPathName = this.pathname

    return this.previousPathnames[0] === currentPathName
      ? null
      : this.previousPathnames[0]
  })

  windowWidth = $derived(innerWidth.current ?? 0)
  windowHeight = $derived(innerHeight.current ?? 0)
  scrollPosition = $derived.by(() => {
    const currentValue = scrollY.current ?? 0

    while (this.previousScrollPositions.length > 1) {
      this.previousScrollPositions.shift()
    }
    this.previousScrollPositions.push(currentValue)

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

  scrollHeight = $derived.by(() => {
    let scrollHeight = Infinity
    if (typeof document !== 'undefined') {
      scrollHeight = document.body.scrollHeight
    }

    return Math.max(scrollHeight, this.windowHeight, scrollY.current ?? 0)
  })
  scrollPercent = $derived(
    this.scrollPosition / (this.scrollHeight - (innerHeight.current ?? 0)),
  )
  distanceFromBottom = $derived.by(() => {
    let scrollHeight = Infinity
    if (typeof document !== 'undefined') {
      scrollHeight = document.body.scrollHeight
    }

    return scrollHeight - this.windowHeight - (this.scrollPosition ?? 0)
  })

  isAtTop = $derived(this.scrollPosition <= END_THRESHOLD)
  isAtBottom = $derived.by(() => {
    let scrollHeight = Infinity
    if (typeof document !== 'undefined') {
      scrollHeight = document.body.scrollHeight
    }

    return (
      this.scrollPosition >=
      scrollHeight - this.windowHeight - END_THRESHOLD * 2.0
    )
  })
}

export const windowState = new WindowState()
