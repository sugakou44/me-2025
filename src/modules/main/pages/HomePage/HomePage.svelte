<script lang="ts">
  import { NameCard } from '@/components/NameCard'
  import { DURATION_SLOW, DURATION_SLOWEST } from '@/lib/animations/constants'
  import { fade } from '@/lib/animations/transition'
  import { useDeviceType } from '@/lib/svelte/breakpointValues.svelte'
  import { MinesSweeperBoard } from '@/modules/games/boardGames/MinesSweeper'
  import { Canvas } from '@/modules/main/components/Canvas'
  // import { MainChat } from '@/modules/main/components/Chat'

  import { HeroScene } from '@/modules/main/scenes/Hero'
  import { World } from '@/modules/main/scenes/World'

  import { appState } from '../../contexts/AppState'

  const getDeviceType = useDeviceType()

  $effect(() => {
    const deviceType = getDeviceType()

    if (appState.scene === 'game' && !deviceType.isDesktop) {
      appState.scene = 'top'
    }
  })
</script>

<NameCard />
<div class="fixed top-0 left-0 text-white/5 md:hidden">placeholder</div>

<div class="fixed inset-0 z-10 full-h w-full">
  <Canvas>
    <HeroScene />
    <World />
  </Canvas>
  {#if appState.scene === 'game'}
    <div
      class="!z-40"
      in:fade={{
        duration: DURATION_SLOW,
        delay: DURATION_SLOWEST * 2.5,
      }}
    >
      <MinesSweeperBoard />
    </div>
  {/if}
</div>
