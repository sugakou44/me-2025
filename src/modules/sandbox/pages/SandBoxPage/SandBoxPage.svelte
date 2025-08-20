<script lang="ts">
  import { Debug, World } from '@threlte/rapier'

  import { Canvas } from '@/components/Canvas'
  import Control from '@/components/Canvas/Control.svelte'
  import { Chapter1Scene } from '@/modules/main/pages/HomePage/scenes/Chapter1'
  import { Chapter2Scene } from '@/modules/main/pages/HomePage/scenes/Chapter2'
  import { Chapter3Scene } from '@/modules/main/pages/HomePage/scenes/Chapter3'
  import { Chapter4Scene } from '@/modules/main/pages/HomePage/scenes/Chapter4'
  import { Chapter5Scene } from '@/modules/main/pages/HomePage/scenes/Chapter5'

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
    <World gravity={[0, 0, -10]}>
      <Debug />
      <!-- <Chapter1Scene /> -->
      <!-- <Chapter2Scene /> -->
      <Chapter3Scene />
      <!-- <Chapter4Scene /> -->
      <!-- <Chapter5Scene /> -->
    </World>
  </Canvas>
</div>
