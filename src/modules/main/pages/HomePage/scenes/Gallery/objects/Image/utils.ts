import rough from 'roughjs'
import { CanvasTexture } from 'three'

import { COLORS } from '@/modules/main/constants/colors'

import type { RoughCanvas } from 'roughjs/bin/canvas'
import type { Options as RoughOptions } from 'roughjs/bin/core'

export interface Options extends RoughOptions {
  width: number
  height: number
  padding?: number
}

export function createCanvasTexture(
  options: Options,
  draw?: (canvas: RoughCanvas) => void,
) {
  const { width, height, padding = 20, ...restOptions } = options

  const canvas = document.createElement('canvas')
  const _width = width * 2
  const _height = height * 2

  canvas.width = _width
  canvas.height = _height
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const roughCanvas = rough.canvas(canvas)

  const lineOptions: RoughOptions = {
    stroke: COLORS.primary.getStyle(),
    fill: 'transparent',
    strokeWidth: 1,
    fillStyle: 'hachure',
    hachureGap: 20,
    ...restOptions,
  }

  roughCanvas.rectangle(0, 0, _width, _height, {
    ...lineOptions,
    roughness: 0,
    strokeWidth: 4,
  })

  roughCanvas.rectangle(0, 0, padding, _height, {
    ...lineOptions,
    strokeWidth: 1,
    fill: COLORS.primary.getStyle(),
  })
  roughCanvas.rectangle(padding, 0, _width - padding, padding, {
    ...lineOptions,
    strokeWidth: 1,
    fill: COLORS.primary.getStyle(),
  })
  roughCanvas.rectangle(padding, _height - padding, _width - padding, _height, {
    ...lineOptions,
    strokeWidth: 1,
    fill: COLORS.primary.getStyle(),
  })
  roughCanvas.rectangle(_width - padding, 0, _width, _height, {
    ...lineOptions,
    strokeWidth: 1,
    fill: COLORS.primary.getStyle(),
  })

  draw?.(roughCanvas)

  const texture = new CanvasTexture(canvas)

  return texture
}
