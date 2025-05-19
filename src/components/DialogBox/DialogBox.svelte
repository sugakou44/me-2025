<script lang="ts">
  import { eases } from 'animejs'
  import { scale } from 'svelte/transition'

  import { DURATION_SLOW } from '@/lib/animations/constants'
  import { mountState } from '@/lib/svelte/mounted.svelte'
  import { cn } from '@/lib/utils/className'
  import { centerPointOrigin } from '@/lib/utils/math'

  interface DialogBoxProps {
    position?: Point2d
    label: string
    class?: string
    heightOffset?: number
  }

  const HEIGHT_OFFSET = 0
  const {
    class: className,
    position = [0, 0],
    label,
    heightOffset = HEIGHT_OFFSET,
  }: DialogBoxProps = $props()

  let previousQuote = ''
  let isMounted = mountState()

  $effect.pre(() => {
    if (label) {
      previousQuote = label
    }
  })

  const [_x = 0, y = 0] = $derived(
    centerPointOrigin([0, position[1]], [position[0], 0]),
  )
</script>

{#key isMounted() && label}
  <div
    in:scale={{
      duration: DURATION_SLOW,
      easing: eases.outElastic(1.05, 0.6),
      opacity: 0,
    }}
    out:scale={{
      duration: DURATION_SLOW,
      easing: eases.outSine,
      opacity: 0,
    }}
    class={cn(
      'transform-center absolute z-50 origin-bottom rounded-lg border-1 border-foreground bg-white p-4 whitespace-nowrap opacity-100 shadow-sm select-none',
      {
        hidden: !isMounted(),
      },
      className,
    )}
    style:top={`${y - heightOffset}px`}
  >
    <q class="[&:after,&:before]:[content:'']">
      {label ?? previousQuote}
    </q>
    <div
      class="dialog-arrow absolute -bottom-3 left-[50%] h-6 w-8 translate-x-[-50%] rotate-135 transform border-1 border-foreground bg-white"
    ></div>
  </div>
{/key}

<style>
  .dialog-arrow {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
  }
</style>
