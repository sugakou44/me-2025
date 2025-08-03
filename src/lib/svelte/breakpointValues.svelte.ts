import { innerWidth } from 'svelte/reactivity/window'

import { getCurrentBreakPoint } from '../utils/styles'

import type { BreakPointKey } from '../utils/styles'

export function useBreakPointValue<T>(
  values: Partial<Dict<T, BreakPointKey | string>>,
) {
  const result = $derived.by(() => {
    const width = innerWidth.current ?? 0

    const currentBreakPoint = getCurrentBreakPoint(
      width,
      Object.keys(values) as BreakPointKey[],
    )

    if (!currentBreakPoint) return undefined

    return (values as Dict<T, BreakPointKey>)[currentBreakPoint]
  })

  return () => result
}

const DEVICES = {
  base: 'mobile',
  md: 'desktop',
} as const

export function useDeviceType() {
  const useDeviceType = useBreakPointValue(DEVICES)

  const result = $derived.by(() => {
    const deviceType = useDeviceType()

    return {
      deviceType,
      isMobile: deviceType === 'mobile',
      isDesktop: deviceType === 'desktop',
    }
  })

  return () => result
}
