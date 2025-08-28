import { page } from '$app/state'

import { ROUTES } from '@/lib/constants/routes'
import { windowState } from '@/lib/contexts/Window'
import {
  checkScrollWithinSection,
  getSectionScrollProgress,
} from '@/lib/utils/context'

class AppState {
  maximizeAtTop = $derived(
    [
      ROUTES.home.pathname,
      ROUTES.storiesMe.pathname,
      ROUTES.sandbox.pathname,
    ].includes(page.url.pathname),
  )
  hideBackButtonInFooter = $derived(
    [ROUTES.home.pathname].includes(page.url.pathname),
  )

  isReady = $state(false)
  isIntroAnimationEnded = $state(false)
  isOpenNameCard = $state(false)
  isOpenCookiesweeper = $state(false)

  isInHero = $derived.by(() => {
    const maximizeAtTop = this.maximizeAtTop
    const isAtTop = windowState.isAtTop

    return maximizeAtTop && isAtTop
  })
  forceOpenHero = $derived.by(() => {
    const isInHero = this.isInHero
    const maximizeAtTop = this.maximizeAtTop

    return isInHero && maximizeAtTop
  })

  creditContainer = $state<HTMLElement>()
  creditScrollProgress = $derived.by(() => {
    return (
      getSectionScrollProgress(
        windowState.scrollPosition,
        windowState.windowHeight,
        this.creditContainer,
      ) * 0.2
    )
  })
  isInCredit = $derived(
    checkScrollWithinSection(this.creditScrollProgress, Infinity),
  )
}

export const appState = new AppState()
