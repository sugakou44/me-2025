import { FEATURE_PROJECTS } from '@/lib/constants/content'
import { windowState } from '@/lib/contexts/Window'
import {
  checkScrollWithinSection,
  getSectionScrollProgress,
} from '@/lib/utils/context'

import type { OrthographicCamera, PerspectiveCamera, Scene } from 'three'

class HomeState {
  perspectiveScene = $state<Scene | undefined>()
  orthographicScene = $state<Scene | undefined>()
  perspectiveCamera = $state<PerspectiveCamera | undefined>()
  orthographicCamera = $state<OrthographicCamera | undefined>()

  aboutContainer = $state<HTMLElement>()
  aboutScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.aboutContainer,
    )
  })
  aboutVisibility = $derived.by(() => {
    return checkScrollWithinSection(this.aboutScrollProgress)
  })

  worksContainer = $state<HTMLElement>()
  worksScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight * 0.6,
      this.worksContainer,
    )
  })
  worksVisibility = $derived.by(() => {
    return checkScrollWithinSection(this.worksScrollProgress)
  })
  worksIndex = $derived.by(() => {
    if (!this.worksVisibility) {
      return -1
    }
    return Math.floor(this.worksScrollProgress * FEATURE_PROJECTS.length)
  })

  experienceContainer = $state<HTMLElement>()
  experienceScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.experienceContainer,
      { max: 2 },
    )
  })

  epilogueContainer = $state<HTMLElement>()
  epilogueScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.epilogueContainer,
    )
  })
  epilogueVisibility = $derived.by(() => {
    return checkScrollWithinSection(this.epilogueScrollProgress)
  })
}

export const homeState = new HomeState()
