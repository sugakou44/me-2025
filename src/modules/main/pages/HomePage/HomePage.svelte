<script lang="ts">
  import { NameCard } from '@/components/NameCard'
  import { DURATION_SLOWEST } from '@/lib/animations/constants'
  import { fade } from '@/lib/animations/transition'
  import { MinesSweeperBoard } from '@/modules/games/boardGames/MinesSweeper'
  import { Canvas } from '@/modules/main/components/Canvas'
  // import { MainChat } from '@/modules/main/components/Chat'

  import { HeroScene } from '@/modules/main/scenes/Hero'
  import { World } from '@/modules/main/scenes/World'

  import { appState } from '../../contexts/AppState'
</script>

<NameCard />

<div class="fixed inset-0 z-10 full-h w-full">
  <Canvas>
    <HeroScene />
    <World />
  </Canvas>
  {#if appState.scene === 'game'}
    <div
      class="!z-40"
      in:fade={{
        duration: DURATION_SLOWEST,
        delay: DURATION_SLOWEST * 2.5,
      }}
    >
      <MinesSweeperBoard />
    </div>
  {/if}
</div>
