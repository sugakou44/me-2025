<script lang="ts">
  import { Canvas as ThreeCanvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import { NoToneMapping, SRGBColorSpace } from 'three'

  import { IS_DEV } from '@/lib/constants'

  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
    loadingFallback?: Snippet
    renderMode?: 'always' | 'manual'
  }

  const { children, renderMode = 'manual', loadingFallback }: Props = $props()

  let perfMonitorLoader = $state<Promise<any>>()

  $effect.pre(() => {
    if (IS_DEV) {
      perfMonitorLoader = import('@/components/GL/PerfMonitor')
    }
  })
</script>

<ThreeCanvas
  colorSpace={SRGBColorSpace}
  toneMapping={NoToneMapping}
  {renderMode}
>
  {#if perfMonitorLoader}
    {#await perfMonitorLoader then { PerfMonitor }}
      <PerfMonitor />
    {/await}
  {/if}
  <Suspense>
    {#snippet fallback()}
      {@render loadingFallback?.()}
    {/snippet}
    {@render children?.()}
  </Suspense>
</ThreeCanvas>
