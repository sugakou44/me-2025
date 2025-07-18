import { page } from '$app/state'
import { scrollY } from 'svelte/reactivity/window'

import { windowState } from '@/lib/contexts/Window'

const END_THRESHOLD = 22
const SCENE_COUNT = 5

class AppState {
  maximizeAtTop = $derived(['/', '/sandbox'].includes(page.url.pathname))

  sceneTriggerThreshold = $derived(Math.round(windowState.scrollHeight / 2))

  sceneIndex = $derived.by(() => {
    const scrollPosition = windowState.scrollPosition
    const documentBound =
      typeof window !== 'undefined'
        ? document.body.getBoundingClientRect()
        : ({} as DOMRect)

    const step = Math.round((documentBound.height ?? 0) / SCENE_COUNT)

    const targetIndex = Math.floor(scrollPosition / step)
    const currentIndex = this.previousScrollIndex

    if (currentIndex === undefined) {
      this.previousSceneIndice.push(targetIndex)

      return targetIndex
    }

    const currentIndexPosition = currentIndex * step

    if (targetIndex === currentIndex) {
      return currentIndex
    }

    const absDiff = Math.abs(scrollPosition - currentIndexPosition)

    if (absDiff <= this.sceneTriggerThreshold) {
      return currentIndex
    }

    this.previousSceneIndice.push(targetIndex)
    while (this.previousSceneIndice.length > 2) {
      this.previousSceneIndice.shift()
    }

    return targetIndex
  })
  previousSceneIndice: number[] = []
  get previousScrollIndex(): number | undefined {
    return this.previousSceneIndice[0]
  }

  isAtTop = $derived((scrollY.current ?? Infinity) <= END_THRESHOLD)
  isAtBottom = $derived(
    (scrollY.current ?? Infinity) >= windowState.scrollHeight - END_THRESHOLD,
  )

  shouldShowHeroDecorator = $derived(this.maximizeAtTop && this.isAtTop)
  shouldShowChat = $derived(this.sceneIndex === 1)
  shouldShowBoardGame = $derived(this.sceneIndex === 2)
  shouldShowHole = $derived(this.sceneIndex === 3)
  shouldShowGrass = $derived(this.sceneIndex === 4)
}

export const appState = new AppState()
