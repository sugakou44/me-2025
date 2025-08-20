import { utils } from 'animejs'

import { DEFUALT_STOP_MOTION_MS } from '../animations/constants'
import { cn, toggleClass } from '../utils/className'
import { roughSvg } from '../utils/rough'
import { explicitEffect } from './explicitEffect.svelte'
import { resizeObserver } from './resizeObserver.svelte'

import type { Options as RoughOptions } from 'roughjs/bin/core'

export interface Options extends RoughOptions {
  randomGutter?: boolean
  shouldAnimate?: boolean
  class?: string
  trackSize?: boolean
}

export function roughBackground({
  randomGutter,
  shouldAnimate,
  trackSize = true,
  class: className,
  ...options
}: Options = {}) {
  let seed = $state(0)
  let size = $state.raw<Point2d>([0, 0])
  let svg = $state<SVGSVGElement>()
  let unobserve = $state<() => void>()
  let observe = $state<(node: Element) => () => void>()

  return (node: HTMLElement) => {
    explicitEffect(
      () => {
        if (!node) {
          return
        }

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

          while (svg.firstChild) {
            svg.removeChild(svg.lastChild!)
          }
          svg.appendChild(child)
        }
      },
      () => [seed, size, node],
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

    const clear = () => {
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

    if (shouldAnimate) {
      const interval = setInterval(() => {
        seed = utils.random(0, 100)
      }, DEFUALT_STOP_MOTION_MS)

      return () => {
        clearInterval(interval)
        clear()
      }
    }

    return () => {
      clear()
    }
  }
}
