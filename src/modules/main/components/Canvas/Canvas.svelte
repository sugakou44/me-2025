<script lang="ts">
  import { Canvas as ThreeCanvas } from '@threlte/core'
  import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

  import { Interactivity } from '@/components/GL/Interactivity'
  import { PerfMonitor } from '@/components/GL/PerfMonitor'

  // import Control from './Control.svelte'
  import Effects from './Effects.svelte'
  import Lights from './Lights.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()

  let container: HTMLDivElement | undefined = $state()
</script>

<div bind:this={container} class="h-full w-full">
  <ThreeCanvas colorSpace={SRGBColorSpace} toneMapping={ACESFilmicToneMapping}>
    <PerfMonitor />
    <!-- <Camera /> -->
    <Lights />
    <Effects />
    <!-- <Control /> -->
    <Interactivity {container}>
      {@render children?.()}
    </Interactivity>
  </ThreeCanvas>
</div>
