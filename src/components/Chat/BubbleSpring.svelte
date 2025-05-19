<script lang="ts">
  import { getSvgPath } from 'figma-squircle'
  import { Spring } from 'svelte/motion'

  import { FAST_SPRING_CONFIG } from '@/lib/animations/constants'
  import { cn } from '@/lib/utils/className'

  import type { Message } from './types'

  const BORDER_RADIUS = 12

  const {
    byUser,
    content,
    shouldAnimate,
  }: Message & {
    shouldAnimate?: boolean
  } = $props()

  let width = $state(0)
  let height = $state(0)

  const path = $derived(
    getSvgPath({
      width: width,
      height: height,
      cornerRadius: BORDER_RADIUS,
      cornerSmoothing: 1,
      bottomLeftCornerRadius: byUser ? BORDER_RADIUS : 0,
      bottomRightCornerRadius: !byUser ? BORDER_RADIUS : 0,
    }),
  )

  const spring = new Spring(0, FAST_SPRING_CONFIG)

  $effect.pre(() => {
    spring.set(1, {
      instant: !shouldAnimate,
    })
  })
</script>

<div
  style:scale={spring.current}
  style:opacity={spring.current}
  style:height={`${spring.current * height}px`}
  style:margin-top={`${spring.current * 8}px`}
  class={cn('relative origin-bottom-left self-start', {
    'origin-bottom-right self-end': byUser,
  })}
>
  <p
    bind:clientHeight={height}
    bind:clientWidth={width}
    class="relative text-md text-background"
  >
    <svg
      class={cn('absolute inset-0 h-full w-full fill-primary-foreground', {
        'fill-secondary-foreground': byUser,
      })}
    >
      <path d={path} />
    </svg>
    <span class="relative block px-4 py-2">{content}</span>
  </p>
</div>
