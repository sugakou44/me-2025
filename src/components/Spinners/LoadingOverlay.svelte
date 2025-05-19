<script lang="ts">
  import Spinner from './Spinner.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    isLoaded?: boolean
    loadingText?: string
    children: Snippet
  }

  const { isLoaded, loadingText, children }: Props = $props()
</script>

{#if isLoaded}
  {@render children()}
{:else}
  <div class="relative">
    <div class="opacity-20">
      {@render children()}
    </div>
    <div
      class="absolute inset-0 flex items-center justify-center gap-2 text-sm"
    >
      <Spinner />
      {#if loadingText}
        <span>{loadingText}</span>}
      {/if}
    </div>
  </div>
{/if}
