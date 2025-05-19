<script lang="ts">
  import { Spring } from 'svelte/motion'

  import { SLOW_SPRING_CONFIG } from '@/lib/animations/constants'
  import { cn } from '@/lib/utils/className'
  import { mod } from '@/lib/utils/math'

  interface Props {
    value: number
    class?: string
    textClass?: string
  }

  const { value, class: className, textClass }: Props = $props()
  const count = new Spring(value, SLOW_SPRING_CONFIG)
  const offset = $derived(mod(count.current, 1))

  $effect(() => {
    count.set(value)
  })
</script>

<div class={cn('relative overflow-hidden text-center', className)}>
  <p class={cn('invisible px-2', textClass)}>{value}</p>
  <p
    class={cn(
      'absolute top-[-100%] flex h-full w-full items-center justify-center select-none',
      textClass,
    )}
    aria-hidden="true"
    style:transform={`translate(0, ${100 * offset}%)`}
    style:opacity={offset * offset}
  >
    {Math.floor(count.current + 1)}
  </p>
  <p
    class={cn(
      'absolute inset-0 flex h-full w-full items-center justify-center',
      textClass,
    )}
    style:transform={`translate(0, ${100 * offset}%)`}
    style:opacity={1 - offset * offset}
  >
    {Math.floor(count.current)}
  </p>
</div>
