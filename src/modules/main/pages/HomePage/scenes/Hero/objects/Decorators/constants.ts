import type { Props } from './types'

export const TOTAL = 5
export const SHAPES = [
  'triangle',
  'circle',
  'hexagon',
  'rectangle',
  'octagon',
] as Props['shape'][]
export const VARIANTS = ['outline', 'solid', 'outline'] as Props['variant'][]
export const PATTERNS = [
  'triangle',
  'circle',
  'square',
  'stripe',
  null,
] as Props['pattern'][]

export const COLORS = ['#ffa69e', '#88e8c2', '#83aeff'] as const

export type Indice = {
  shape: Props['shape']
  variant: Props['variant']
  pattern: Props['pattern']
  shapeRaio: number
  patternCount: number
  negative: boolean
  idleMovementItensity: number
}
