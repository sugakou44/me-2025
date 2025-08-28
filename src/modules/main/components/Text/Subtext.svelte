<script lang="ts">
  import { cn } from '@/lib/utils/className'

  import type { Snippet } from 'svelte'

  interface Props {
    class?: string
    children?: Snippet
  }

  const { class: className, children }: Props = $props()
</script>

<span
  class={cn('inline-block text-[0.5em] opacity-60', className)}
  style:--outline-width="0px"
>
  {@render children?.()}
</span>
