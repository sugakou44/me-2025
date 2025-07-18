<script lang="ts">
  // import { RandomText } from '@/components/Text/RandomText'

  // import { NameCard } from '@/components/NameCard'
  // import DrawingText from '@/components/Text/DrawingText.svelte'
  // import { MinesSweeperBoard } from '@/modules/games/boardGames/MinesSweeper'
  // import { TicTacToeBoard } from '@/modules/games/boardGames/TicTacToe'
  // import { MainChat } from '@/modules/main/components/Chat'

  // import Experience from '@/modules/main/components/Experience/Experience.svelte'
  // import { HeroScene } from '@/modules/main/scenes/Hero'
  import { Canvas } from '@/modules/main/components/Canvas'
  import { World } from '@/modules/main/scenes/World'
</script>

<!-- <NameCard /> -->

<div class="fixed inset-0 z-40 full-h w-full">
  <Canvas>
    <!-- <HeroScene /> -->
    <World />
  </Canvas>
</div>
<div class="section flex min-h-[1000vh] flex-col items-center gap-10 p-20">
  <!-- <DrawingText
    as="h2"
    content="DrawingText 404"
    isIn={true}
    class="section-title"
    animationOptions={{
      draw: isOpen ? '0 0.001' : '0 0.4',
      // scale: isOpen ? 2 : 1,
    }}
  /> -->
  <!-- <MainChat /> -->
  <!-- <Experience /> -->
  <!-- <TicTacToeBoard />
  <MinesSweeperBoard /> -->
  <!-- <RandomText content="RandomText" isIn={isOpen} /> -->
</div>
