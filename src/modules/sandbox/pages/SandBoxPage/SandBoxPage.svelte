<script lang="ts">
  import { Debug, World } from '@threlte/rapier'

  import { Canvas } from '@/components/Canvas'
  import Control from '@/components/Canvas/Control.svelte'
  import Interactivity from '@/components/GL/Interactivity/Interactivity.svelte'
  import { MainChat } from '@/modules/main/components/Chat'
  import { storyState } from '@/modules/main/contexts/StoryState'
  import { Experience } from '@/modules/main/pages/HomePage/sections/Experience'

  let isOpen = $state(false)

  $effect(() => {
    const timer = setTimeout(() => {
      isOpen = !isOpen
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  })
</script>

<div class="fixed inset-0 z-40 full-h w-full">
  <Canvas renderMode="always">
    <Control />
    <Interactivity>
      <World gravity={[0, 0, -10]}>
        <Debug />
      </World>
    </Interactivity>
  </Canvas>
</div>
<Experience />
<MainChat />
<div class="min-h-[400vh]" bind:this={storyState.chapter2Container}></div>
