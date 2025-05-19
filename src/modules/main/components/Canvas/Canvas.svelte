<script lang="ts">
  import { Canvas as ThreeCanvas } from '@threlte/core'
  import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

  import { PerfMonitor } from '@/components/GL/PerfMonitor'

  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()
</script>

<ThreeCanvas colorSpace={SRGBColorSpace} toneMapping={ACESFilmicToneMapping}>
  <PerfMonitor />
  {@render children?.()}
</ThreeCanvas>
