<script lang="ts">
  import { eases } from 'animejs'
  import { scale } from 'svelte/transition'

  import { DURATION_SLOW } from '@/lib/animations/constants'
  import { useMounted } from '@/lib/svelte/mounted.svelte'
  import { cn } from '@/lib/utils/className'
  import { centerPointOrigin } from '@/lib/utils/math'

  interface DialogBoxProps {
    position?: Point2d
    label?: string
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

  // TODO: change to none state variable
  let previousQuote = $state('')
  let isMounted = useMounted()

  $effect.pre(() => {
    if (label) {
      previousQuote = label
    }
  })

  const [_x = 0, y = 0] = $derived(
    centerPointOrigin([0, position[1]], [position[0], 0]),
  )
</script>

{#if label}
  {#key isMounted.current && label}
    <div
      in:scale|global={{
        duration: DURATION_SLOW,
        easing: eases.outElastic(1.05, 0.6),
        opacity: 0,
      }}
      out:scale|global={{
        duration: DURATION_SLOW,
        easing: eases.outSine,
        opacity: 0,
      }}
      class={cn(
        'transform-center absolute z-50 origin-bottom rounded-lg border-2 border-primary-foreground  bg-white p-4 whitespace-nowrap opacity-100 shadow-sm select-none',
        {
          hidden: !isMounted.current,
        },
        className,
      )}
      style:top={`${y - heightOffset}px`}
    >
      <q
        class="font-medium text-primary-foreground [&:after,&:before]:[content:'']"
      >
        {label ?? previousQuote}
      </q>
      <div
        class="dialog-arrow absolute -bottom-3 left-[50%] h-6 w-8 translate-x-[-50%] rotate-135 transform border-2 border-primary-foreground bg-white"
      ></div>
    </div>
  {/key}
{/if}

<style>
  .dialog-arrow {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
  }
</style>
