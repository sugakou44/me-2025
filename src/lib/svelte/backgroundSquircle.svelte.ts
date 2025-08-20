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
  let size = $state.raw<Point2d>([0, 0])
  let svg = $state<SVGSVGElement>()
  let path = $state<SVGPathElement>()
  let unobserve: (() => void) | undefined
  let observe: ((node: Element) => () => void) | undefined

  return (node: HTMLElement) => {
    explicitEffect(
      () => {
        const { width, height } = node.getBoundingClientRect()

        const nodeComputedStyle = getComputedStyle(node)

        if (!svg) {
          svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          node.insertBefore(svg, node.firstChild)
        }

        if (width > 0 && height > 0) {
          if (nodeComputedStyle.getPropertyValue('position') === 'static') {
            node.classList.toggle('relative', true)
          }

          toggleClass(
            svg,
            cn('absolute inset-0 h-full w-full', className),
            true,
          )

          const squirclePath = squircle({
            width: width,
            height: height,
            ...options,
          })

          if (!path) {
            path = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'path',
            )
            svg.appendChild(path)
          }

          path.setAttribute('d', squirclePath)
        }
      },
      () => [node, size, className, trackSize],
    )

    explicitEffect(
      () => {
        if ((!node || !trackSize) && unobserve) {
          unobserve()
          unobserve = undefined
          observe = undefined
          return
        }

        if (!node) {
          return
        }

        const onResize = ({
          clientBoundingRect,
        }: {
          clientBoundingRect: DOMRect
        }) => {
          const newSize: Point2d = [
            clientBoundingRect.width,
            clientBoundingRect.height,
          ]

          if (newSize[0] !== size[0] || newSize[1] !== size[1]) {
            size = newSize
          }
        }

        if (observe && unobserve) {
          unobserve()
          unobserve = observe(node)

          return
        }

        if (trackSize) {
          observe = resizeObserver(onResize)

          unobserve = observe(node)
        }
      },
      () => [node, trackSize],
    )

    return () => {
      if (unobserve) {
        unobserve()
      }

      if (node) {
        for (const child of node.children) {
          if (child === svg) {
            node.removeChild(svg)
            return
          }
        }
      }
    }
  }
}
