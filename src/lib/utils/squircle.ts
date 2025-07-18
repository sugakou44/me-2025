import { getSvgPath } from 'figma-squircle'

import type { FigmaSquircleParams } from 'figma-squircle'

export function squircle(
  options: Partial<FigmaSquircleParams> &
    Pick<FigmaSquircleParams, 'width' | 'height'>,
) {
  const squirclePath = getSvgPath({
    cornerRadius: 16,
    cornerSmoothing: 1,
    ...options,
  })

  return squirclePath
}
