<script lang="ts">
  import { Canvas as ThreeCanvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

  import { PerfMonitor } from '@/components/GL/PerfMonitor'

  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
    loadingFallback?: Snippet
    renderMode?: 'always' | 'manual'
  }

  const { children, renderMode = 'manual', loadingFallback }: Props = $props()
</script>

<ThreeCanvas
  colorSpace={SRGBColorSpace}
  toneMapping={ACESFilmicToneMapping}
  {renderMode}
>
  <PerfMonitor />
  <Suspense>
    {#snippet fallback()}
      {@render loadingFallback?.()}
    {/snippet}
    {@render children?.()}
  </Suspense>
</ThreeCanvas>
