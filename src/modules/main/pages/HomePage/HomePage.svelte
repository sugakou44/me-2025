<script lang="ts">
  import { NameCard } from '@/components/NameCard'
  import { Canvas } from '@/modules/main/components/Canvas'
  // import { MinesSweeperBoard } from '@/modules/games/boardGames/MinesSweeper'
  // import { TicTacToeBoard } from '@/modules/games/boardGames/TicTacToe'
  // import { MainChat } from '@/modules/main/components/Chat'

  import { HeroScene } from '@/modules/main/scenes/Hero'

  // import { World } from '@/modules/main/scenes/World'
</script>

<NameCard />

<div class="fixed inset-0 z-40 full-h w-full">
  <Canvas>
    <HeroScene />
    <!-- <World /> -->
  </Canvas>
</div>
