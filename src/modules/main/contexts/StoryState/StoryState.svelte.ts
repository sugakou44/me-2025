import { windowState } from '@/lib/contexts/Window'
import {
  checkScrollWithinSection,
  getCurrentPageInChapter,
  getSectionScrollProgress,
} from '@/lib/utils/context'

class StoryState {
  prologueContainer = $state<HTMLElement>()
  prologueScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.prologueContainer,
      {
        offset: 0.44,
      },
    )
  })

  chapter1Container = $state<HTMLElement>()
  chapter1ScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.chapter1Container,
    )
  })
  chapter1TotalPage = 3
  chapter1DistancePerPage = 1 / this.chapter1TotalPage
  chapter1Page = $derived.by(() => {
    return getCurrentPageInChapter(
      this.chapter1ScrollProgress,
      this.chapter1DistancePerPage,
      this.chapter1TotalPage,
    )
  })

  chapter2Container = $state<HTMLElement>()
  chapter2ScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.chapter2Container,
      { max: Infinity },
    )
  })
  chapter2TotalPage = 3
  chapter2DistancePerPage = 1 / this.chapter2TotalPage
  chapter2Page = $derived.by(() => {
    return getCurrentPageInChapter(
      this.chapter2ScrollProgress,
      this.chapter2DistancePerPage,
      this.chapter2TotalPage,
    )
  })

  chapter3Container = $state<HTMLElement>()
  chapter3ScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.chapter3Container,
    )
  })
  chapter3TotalPage = 3
  chapter3DistancePerPage = 1 / this.chapter3TotalPage
  chapter3Page = $derived.by(() => {
    return getCurrentPageInChapter(
      this.chapter3ScrollProgress,
      this.chapter3DistancePerPage,
      this.chapter3TotalPage,
    )
  })

  chapter4Container = $state<HTMLElement>()
  chapter4ScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.chapter4Container,
    )
  })
  chapter4TotalPage = 3
  chapter4DistancePerPage = 1 / this.chapter4TotalPage
  chapter4Page = $derived.by(() => {
    return getCurrentPageInChapter(
      this.chapter4ScrollProgress,
      this.chapter4DistancePerPage,
      this.chapter4TotalPage,
    )
  })

  chapter5Container = $state<HTMLElement>()
  chapter5ScrollProgress = $derived.by(() => {
    return getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.chapter5Container,
    )
  })
  chapter5TotalPage = 3
  chapter5DistancePerPage = 1 / this.chapter5TotalPage
  chapter5Page = $derived.by(() => {
    return getCurrentPageInChapter(
      this.chapter5ScrollProgress,
      this.chapter5DistancePerPage,
      this.chapter5TotalPage,
    )
  })

  epilogueContainer = $state<HTMLElement>()
  epilogueScrollProgress = $derived.by(() => {
    // const progress = utils.clamp(
    //   utils.mapRange(
    //     getSectionScrollProgress(
    //       windowState.scrollPosition,
    //       windowState.windowHeight,
    //       this.epilogueContainer,
    //     ),
    //     0.5,
    //     1,
    //     0,
    //     1,
    //   ),
    //   0,
    //   1,
    // )
    //
    const progress = getSectionScrollProgress(
      windowState.scrollPosition,
      windowState.windowHeight,
      this.epilogueContainer,
      { max: Infinity },
    )

    return progress
  })
  epilogueTotalPage = 5
  epilogueDistancePerPage = 1 / this.epilogueTotalPage
  epiloguePage = $derived.by(() => {
    return getCurrentPageInChapter(
      this.epilogueScrollProgress,
      this.epilogueDistancePerPage,
      this.epilogueTotalPage - 1,
      { max: Infinity },
    )
  })

  hasVisittedEpilogue = $state(false)
  isInEpilogue = $derived(
    checkScrollWithinSection(this.epilogueScrollProgress, Infinity),
  )
}

export const storyState = new StoryState()
