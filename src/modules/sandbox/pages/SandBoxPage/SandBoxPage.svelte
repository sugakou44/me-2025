<script lang="ts">
  // import { MainChat } from '@/modules/main/components/Chat'

  // import { RandomText } from '@/components/Text/RandomText'

  // import { NameCard } from '@/components/NameCard'
  // import DrawingText from '@/components/Text/DrawingText.svelte'
  // import { MinesSweeperBoard } from '@/modules/games/boardGames/MinesSweeper'
  // import { TicTacToeBoard } from '@/modules/games/boardGames/TicTacToe'
  import Experience from '@/modules/main/components/Experience/Experience.svelte'

  let isOpen = $state(false)

  $effect(() => {
    const interval = setInterval(() => {
      isOpen = !isOpen
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<!-- <NameCard /> -->

<div class="section flex min-h-[400vh] flex-col items-center gap-10 p-20">
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
  <Experience />
  <!-- <TicTacToeBoard />
  <MinesSweeperBoard /> -->
  <!-- <RandomText content="RandomText" isIn={isOpen} /> -->
</div>
