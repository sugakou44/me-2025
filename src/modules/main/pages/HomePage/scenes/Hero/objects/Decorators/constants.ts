import { COLORS as _COLORS } from '@/modules/main/constants/colors'

export const TOTAL = 6
export const SHAPES = [
  'triangle',
  'circle',
  'hexagon',
  'rectangle',
  'octagon',
] as const
export type Shape = (typeof SHAPES)[number]

export const VARIANTS = ['outline', 'solid', 'ghost'] as const
export type Variant = (typeof VARIANTS)[number]

export const PATTERNS = [
  'triangle',
  'circle',
  'square',
  'stripe',
  null,
] as const
export type Pattern = (typeof PATTERNS)[number]

export const COLORS = [
  _COLORS.primary,
  _COLORS.secondary,
  _COLORS.tertiary,
  _COLORS.quaternary.clone().addScalar(0.7).multiplyScalar(0.7),
] as const

export type Indice = {
  shape: Shape
  variant: Variant
  pattern: Pattern
  shapeRaio: number
  patternCount: number
  negative: boolean
  idleMovementItensity: number
}
