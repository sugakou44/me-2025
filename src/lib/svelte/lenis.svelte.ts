import Lenis from 'lenis'

import type { LenisOptions } from 'lenis'

export const LENIS_OPTIONS: LenisOptions = {
  autoRaf: true,
  duration: 0.2,
  overscroll: false,
  syncTouch: true
}

export const lenis =
  typeof window !== 'undefined' ? new Lenis(LENIS_OPTIONS) : null
