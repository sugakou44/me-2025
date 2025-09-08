<script lang="ts">
  import { roughBackground } from '@/lib/svelte/backgroundRough.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<div
  {@attach roughBackground({
    shouldAnimate: true,
    fill: 'var(--secondary)',
  })}
>
  <p class="relative px-2 py-1 text-sm shadow-sm">
    {@render children()}
  </p>
</div>
