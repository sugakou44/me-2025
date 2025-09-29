import Lenis from 'lenis'

import type { LenisOptions } from 'lenis'

export const LENIS_OPTIONS: LenisOptions = {
  autoRaf: true,
  overscroll: false,
}

export const lenis =
  typeof window !== 'undefined' ? new Lenis(LENIS_OPTIONS) : null
