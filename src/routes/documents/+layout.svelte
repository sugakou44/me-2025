<script lang="ts">
  import HintText from '@/components/Text/HintText.svelte'

  let { children } = $props()
</script>

<div class="document container mx-auto full-h max-w-4xl p-8">
  <div
    class="print:pt:4 h-full bg-white px-8 pt-10 pb-20 print:px-4 print:pb-4"
  >
    {@render children()}
  </div>
</div>

<HintText class="bg-white/70">You can print this if necessary</HintText>

<style>
  :global(
    .document h1,
    .document h2,
    .document h3,
    .document h4,
    .document p,
    .document li
  ) {
    font-family: var(--font-document);
  }

  :global(.document h1) {
    font-size: var(--text-3xl);
  }
  :global(.document h2) {
    font-size: var(--text-2xl);
  }
  :global(.document h3) {
    font-size: var(--text-xl);
  }
  :global(.document h4) {
    font-size: var(--text-lg);
  }
  :global(.document p, .document li) {
    font-size: var(--text-md);
  }
  :global(.document li) {
    list-style-type: disc;
    list-style-position: inside;
    font-size: var(--text-sm);
    padding-left: calc(2 * var(--spacing));
  }
</style>
