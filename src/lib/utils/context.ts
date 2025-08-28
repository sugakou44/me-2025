import { utils } from 'animejs'

interface Options {
  heightMultiplier?: number
  min?: number
  max?: number
  offset?: number
}

export function getSectionScrollProgress(
  scrollPosition: number,
  windowHeight: number,
  container?: HTMLElement,
  options: Options = {
    heightMultiplier: 1,
    min: 0,
    max: 1,
    offset: 0,
  },
) {
  if (!container) return 0

  const containerBound = container.getBoundingClientRect()

  const scrollPassed = Math.max(-1 * (containerBound.y - windowHeight), 0.0)
  const revealPercent =
    scrollPassed / (containerBound.height * (options.heightMultiplier ?? 1))

  return utils.clamp(
    revealPercent - (options.offset ?? 0),
    options.min ?? 0,
    options.max ?? 1,
  )
}

export function getCurrentPageInChapter(
  scrollProgress: number,
  distancePerPage: number,
  totalPage: number,
  options?: Options,
) {
  if (!checkScrollWithinSection(scrollProgress, options?.max, options?.min)) {
    return -1
  }
  return utils.clamp(Math.floor(scrollProgress / distancePerPage), 0, totalPage)
}

export function checkScrollWithinSection(
  scrollProgress: number,
  max = 0.999,
  min = 0.001,
) {
  return scrollProgress >= min && scrollProgress <= max
}
