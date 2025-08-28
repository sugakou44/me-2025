<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<h2
  class="text-outline text-center font-bold text-secondary-foreground"
  style:--outline-width="0.2em"
>
  <span class="text-[4em]">
    {@render children()}
  </span>
</h2>
