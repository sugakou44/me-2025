import { utils } from 'animejs'

import { roughSvg } from '../utils/rough'

import type { Options as RoughOptions } from 'roughjs/bin/core'

export function roughBackground(isIn: boolean, options?: RoughOptions) {
  let seed = $state(0)

  return (svg: SVGSVGElement) => {
    const { width, height } = svg.getBoundingClientRect()

    const interval = setInterval(() => {
      seed = utils.random(0, 100)
    })

    const roughSvgInstance = roughSvg(svg)

    const child = roughSvgInstance.rectangle(
      isIn ? 0 : utils.random(-4, 4),
      isIn ? 0 : utils.random(-4, 4),
      width,
      height,
      {
        seed: seed,
        fill: 'var(--primary)',
        fillStyle: 'solid',
        hachureGap: 20,
        stroke: 'none',
        fillWeight: 0.5,
        bowing: 6,
        ...options,
      },
    )
    svg.appendChild(child)

    return () => {
      svg.removeChild(child)
      clearInterval(interval)
    }
  }
}
