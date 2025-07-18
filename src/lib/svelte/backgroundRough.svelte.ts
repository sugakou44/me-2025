import { utils } from 'animejs'

import { DEFUALT_STOP_MOTION_MS } from '../animations/constants'
import { cn, toggleClass } from '../utils/className'
import { roughSvg } from '../utils/rough'
import { explicitEffect } from './explicitEffect.svelte'
import { resizeObserver } from './resizeObserver.svelte'

import type { Options as RoughOptions } from 'roughjs/bin/core'

export function roughBackground({
  randomGutter,
  shouldAnimate,
  trackSize = true,
  class: className,
  ...options
}: RoughOptions & {
  randomGutter?: boolean
  shouldAnimate?: boolean
  class?: string
  trackSize?: boolean
} = {}) {
  let seed = $state(0)
  let node = $state<HTMLElement | null>(null)
  let size = $state.raw<Point2d>([0, 0])

  explicitEffect(
    () => {
      if (!node) {
        return
      }

      let observe: (node: Element) => () => void
      let unobserve: () => void
      if (trackSize) {
        observe = resizeObserver(({ clientBoundingRect }) => {
          const newSize: Point2d = [
            clientBoundingRect.width,
            clientBoundingRect.height,
          ]

          if (newSize[0] !== size[0] || newSize[1] !== size[1]) {
            size = newSize
          }
        })

        unobserve = observe(node)
      }

      const { width, height } = node.getBoundingClientRect()
      const nodeComputedStyle = getComputedStyle(node)

      const svg = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      ) as SVGSVGElement

      if (width >= 0.1 && height >= 0.1) {
        if (nodeComputedStyle.getPropertyValue('position') === 'static') {
          node.classList.toggle('relative', true)
        }

        node.insertBefore(svg, node.firstChild)
        toggleClass(svg, cn('absolute inset-0 h-full w-full', className), true)

        const roughSvgInstance = roughSvg(svg)

        const child = roughSvgInstance.rectangle(
          !randomGutter ? 0 : utils.random(-4, 4),
          !randomGutter ? 0 : utils.random(-4, 4),
          width,
          height,
          {
            seed: seed,
            fill: 'var(--primary)',
            fillStyle: 'solid',
            hachureGap: 20,
            stroke: 'none',
            fillWeight: 0.5,
            roughness: 1,
            bowing: 1,
            disableMultiStroke: false,
            disableMultiStrokeFill: false,
            ...options,
          },
        )

        svg.appendChild(child)
      }

      return () => {
        if (unobserve) {
          unobserve()
        }

        if (node) {
          node.removeChild(svg)
        }
      }
    },
    () => [seed, size, node],
  )

  return (_node: HTMLElement) => {
    node = _node
    if (shouldAnimate) {
      const interval = setInterval(() => {
        seed = utils.random(0, 100)
      }, DEFUALT_STOP_MOTION_MS)

      return () => {
        clearInterval(interval)
      }
    }
  }
}
