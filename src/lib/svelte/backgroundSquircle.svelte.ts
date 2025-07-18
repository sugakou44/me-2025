import { cn, toggleClass } from '../utils/className'
import { squircle } from '../utils/squircle'
import { explicitEffect } from './explicitEffect.svelte'
import { resizeObserver } from './resizeObserver.svelte'

import type { FigmaSquircleParams } from 'figma-squircle'

export function squircleBackground({
  class: className,
  trackSize = true,
  ...options
}: Partial<FigmaSquircleParams> & {
  class?: string
  trackSize?: boolean
} = {}) {
  let node = $state<HTMLElement | null>(null)
  let size = $state.raw<Point2d>([0, 0])

  explicitEffect(
    () => {
      if (!node) {
        return
      }

      const { width, height } = node.getBoundingClientRect()

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

        const squirclePath = squircle({
          width: width,
          height: height,
          ...options,
        })

        const path = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path',
        ) as SVGPathElement

        path.setAttribute('d', squirclePath)
        svg.appendChild(path)
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
    () => [node, size],
  )

  return (_node: HTMLElement) => {
    node = _node
  }
}
