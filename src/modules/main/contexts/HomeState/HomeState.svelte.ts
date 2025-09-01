import { windowState } from '@/lib/contexts/Window'
import {
  checkScrollWithinSection,
  getSectionScrollProgress,
} from '@/lib/utils/context'

import type { Scene } from 'three'

class HomeState {
  perspectiveScene = $state<Scene | undefined>()
  orthographicScene = $state<Scene | undefined>()

  aboutContainer1 = $state<HTMLElement>()
  aboutScrollProgress1 = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.aboutContainer1,
    )
  })
  aboutVisibility1 = $derived.by(() => {
    return checkScrollWithinSection(this.aboutScrollProgress1)
  })

  aboutContainer2 = $state<HTMLElement>()
  aboutScrollProgress2 = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.aboutContainer2,
    )
  })
  aboutVisibility2 = $derived.by(() => {
    return checkScrollWithinSection(this.aboutScrollProgress2)
  })

  experienceContainer = $state<HTMLElement>()
  experienceScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.experienceContainer,
    )
  })
  experienceVisibility = $derived.by(() => {
    return checkScrollWithinSection(this.experienceScrollProgress, 2)
  })

  testimonialContainer = $state<HTMLElement>()
  testimonialScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.testimonialContainer,
      {
        offset: 0.44,
      },
    )
  })
}

export const homeState = new HomeState()
