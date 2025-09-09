<script lang="ts">
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { cn } from '@/lib/utils/className'

  import type { FigmaSquircleParams } from 'figma-squircle'
  import type { Snippet } from 'svelte'

  interface Props extends Partial<FigmaSquircleParams> {
    class?: string
    classNoMerge?: string
    children?: Snippet
    backgroundClass?: string
  }

  let {
    class: className,
    classNoMerge = '',
    children,
    backgroundClass,
    ...restProps
  }: Props = $props()
</script>

<p
  class={`${cn('relative p-6 text-center md:p-12', className)} ${classNoMerge}`}
  style:--outline-color="#ffffff"
  {@attach squircleBackground({
    cornerRadius: 64,
    bottomRightCornerRadius: 0,
    class: cn('fill-white', backgroundClass),
    ...restProps,
  })}
>
  {@render children?.()}
</p>
