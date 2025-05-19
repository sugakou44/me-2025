<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'p'">
  import { svg as animeSVG, createSpring, stagger, utils } from 'animejs'
  import { untrack } from 'svelte'

  import { animate } from '@/lib/animations/animejs'
  import {
    DEFAULT_SPRING_CONFIG,
    DURATION_NORMAL,
  } from '@/lib/animations/constants'
  import { cn } from '@/lib/utils/className'
  import { roughSvg } from '@/lib/utils/rough'

  import { ALL_CHARACTERS_PATHS } from './constants'

  import type { AnimationParams, DrawableSVGGeometry } from 'animejs'
  import type { Options } from 'roughjs/bin/core'
  import type { AnimatedTextProps } from './types'

  const spring = createSpring(DEFAULT_SPRING_CONFIG)

  const {
    as = 'p' as T,
    content,
    class: className,
    svgClass,
    separator = '',
    immediateEnter = false,
    options,
    animationOptions,
  }: AnimatedTextProps<T> & {
    svgClass?: string
    options?: Options
    animationOptions?: AnimationParams
  } = $props()

  const [_chars, paths] = $derived.by(() => {
    const chars = untrack(() => content).split(separator)
    const paths = chars.map((char) => {
      return ALL_CHARACTERS_PATHS[char]
    })
    return [chars, paths]
  })

  const drawablePaths: DrawableSVGGeometry[][] = []

  $effect(() => {
    if (!immediateEnter) {
      const animation = animate(drawablePaths, {
        opacity: { to: 1, duration: DURATION_NORMAL, ease: 'linear' },
        draw: ['0 0', '0 1'],
        ease: spring,
        delay: stagger(100),
        ...animationOptions,
      })

      return () => {
        animation.complete()
        utils.remove(drawablePaths)
      }
    }
  })

  function drawText(svg: SVGSVGElement) {
    const rough = roughSvg(svg)

    const fontSize = window
      .getComputedStyle(svg, null)
      .getPropertyValue('font-size')

    paths.forEach((rawPath, index) => {
      if (typeof rawPath !== 'string') {
        return
      }

      const roughPath = rough.path(rawPath, {
        roughness: 0,
        bowing: 1,
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLineDashOffset: 200,
        ...options,
      })

      roughPath.style.transform = `translateX(${index * 0.9}ch) translateX(${0.2}ch) translateY(${0.7}ch) scale(${parseFloat(fontSize) / 20})`

      roughPath.classList.toggle('transform-fill', true)
      roughPath.classList.toggle('origin-left', true)
      roughPath.classList.toggle('opacity-0', true)

      drawablePaths.push(animeSVG.createDrawable(roughPath))

      svg.appendChild(roughPath)
    })

    return () => {
      drawablePaths.length = 0

      while (svg.firstChild) {
        utils.remove(svg.lastChild!)
        svg.removeChild(svg.lastChild!)
      }
    }
  }
</script>

<svelte:element
  this={as}
  class={cn('relative font-mono text-primary-foreground', className)}
>
  <span class="relative whitespace-pre opacity-0">
    {content}
  </span>
  <svg
    class={cn('absolute top-0 left-0 h-full w-full transform-fill', svgClass)}
    {@attach drawText}
  >
  </svg>
</svelte:element>
