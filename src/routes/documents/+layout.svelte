<script lang="ts">
  import { DocumentsHead } from '@/components/Head/DocumentsHead'
  import HintText from '@/components/Text/HintText.svelte'

  let { children } = $props()
</script>

<DocumentsHead />

<div class="document-container container mx-auto full-h max-w-4xl p-4 md:p-8">
  <div
    class="print:pt:4 h-full bg-white px-4 pt-10 pb-20 md:px-8 print:px-4 print:pb-4"
  >
    {@render children()}
  </div>
</div>

<HintText class="bg-white/70">You can print this page if necessary</HintText>

<style>
  :global(
    .document-container h1,
    .document-container h2,
    .document-container h3,
    .document-container h4,
    .document-container p,
    .document-container li
  ) {
    font-family: var(--font-document);
  }

  :global(.document-container h1) {
    font-size: var(--text-3xl);
  }
  :global(.document-container h2) {
    font-size: var(--text-2xl);
  }
  :global(.document-container h3) {
    font-size: var(--text-xl);
  }
  :global(.document-container h4) {
    font-size: var(--text-lg);
  }
  :global(.document-container p, .document-container li) {
    font-size: var(--text-md);
  }
  :global(.document-container li) {
    list-style-type: disc;
    list-style-position: inside;
    font-size: var(--text-sm);
    padding-left: calc(2 * var(--spacing));
  }
</style>
