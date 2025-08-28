<script lang="ts">
  import { Canvas as ThreeCanvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import { NoToneMapping, SRGBColorSpace } from 'three'

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
  toneMapping={NoToneMapping}
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
