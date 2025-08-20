<script lang="ts">
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { cn } from '@/lib/utils/className'

  import type { FigmaSquircleParams } from 'figma-squircle'
  import type { Snippet } from 'svelte'

  interface Props extends Partial<FigmaSquircleParams> {
    class?: string
    children?: Snippet
    backgroundClass?: string
  }

  let {
    class: className,
    children,
    backgroundClass,
    ...restProps
  }: Props = $props()
</script>

<p
  class={cn('relative p-4 text-center md:p-6', className)}
  {@attach squircleBackground({
    cornerRadius: 16,
    cornerSmoothing: 1,
    class: cn('fill-white/20 -z-10', backgroundClass),
    ...restProps,
  })}
>
  {@render children?.()}
</p>
