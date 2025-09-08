<script lang="ts">
  import { cn } from '@/lib/utils/className'

  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    class?: string
  }

  let { children, class: className, ...restProps }: Props = $props()
</script>

<h2
  class={`text-outline ${cn(
    'self-center text-center font-bold text-primary-foreground uppercase',
    className,
  )}`}
  style:--outline-width="0.1em"
  {...restProps}
>
  <span class="text-[2.2em] sm:text-[3em] md:text-[4em]">
    {@render children()}
  </span>
</h2>
