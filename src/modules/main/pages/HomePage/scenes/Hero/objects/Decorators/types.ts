import type { T } from '@threlte/core'
import type { ComponentProps } from 'svelte'
import type { Pattern, Shape, Variant } from './constants'

export interface Props extends ComponentProps<typeof T.Group> {
  isIn?: boolean
  idleMovementItensity?: number
  color?: string | number
  opacity?: number
  width?: number
  height?: number
  borderWidth?: number
  patternCount?: number
  patternScaleRatio?: number
  shapeRatio?: number
  negative?: boolean
  shape?: Shape
  variant?: Variant
  pattern?: Pattern
}
