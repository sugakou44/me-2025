<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    title: string
    titleClassName?: string
  }

  const { title, children, titleClassName }: Props = $props()
</script>

<section class="space-y-4">
  <h2 class={titleClassName}>{title}</h2>
  <div class="space-y-3">
    {@render children()}
  </div>
</section>
