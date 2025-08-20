import type { T } from '@threlte/core'
import type { ComponentProps } from 'svelte'
import type { Pattern } from './shaders/pattern'
import type { Shape } from './shaders/shape'

export interface Props extends ComponentProps<typeof T.Group> {
  isIn?: boolean
  idleMovementItensity?: number
  color?: string
  opacity?: number
  width?: number
  height?: number
  borderWidth?: number
  patternCount?: number
  patternScaleRatio?: number
  shapeRatio?: number
  negative?: boolean
  shape?: Shape
  variant?: 'solid' | 'outline' | 'ghost'
  pattern?: Pattern
}
