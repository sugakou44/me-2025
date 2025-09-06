<script lang="ts">
  import { utils } from 'animejs'
  import { Spring } from 'svelte/motion'

  import {
    DEFAULT_SPRING_CONFIG,
    FAST_SPRING_CONFIG,
  } from '@/lib/animations/constants'
  import { gestures } from '@/lib/svelte/gestures.svelte'
  import { cn } from '@/lib/utils/className'

  import Button from './Button.svelte'

  import type { Props } from './types'

  const DEFAULT_BOUND_SIZE = 20

  const {
    boundSize = DEFAULT_BOUND_SIZE,
    containerClassName,
    ...rest
  }: Props & {
    boundSize?: number
    containerClassName?: string
  } = $props()

  const spring = new Spring({ x: 0, y: 0 }, DEFAULT_SPRING_CONFIG)
</script>

<div
  {@attach gestures({
    onMove: ({ fromCenter: [x, y], isHover }) => {
      if (isHover) {
        const clamp = utils.clamp(-boundSize, boundSize)
        spring.stiffness = DEFAULT_SPRING_CONFIG.stiffness
        spring.damping = DEFAULT_SPRING_CONFIG.damping
        spring.set({
          x: clamp(x),
          y: clamp(y),
        })
      } else {
        spring.stiffness = FAST_SPRING_CONFIG.stiffness
        spring.damping = FAST_SPRING_CONFIG.damping
        spring.set({
          x: 0,
          y: 0,
        })
      }
    },
  })}
  class={cn(
    'h-fit w-fit touch-none rounded-full p-2 sm:p-3 lg:p-5',
    containerClassName,
  )}
>
  <div
    style:transform={`translate3d(${spring.current.x}px, ${spring.current.y}px, 0)`}
  >
    <Button {...rest} />
  </div>
</div>
