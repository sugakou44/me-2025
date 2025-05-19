<script lang="ts">
  import Button from '@/components/Buttons/Button.svelte'
  import Spinner from '@/components/Spinners/Spinner.svelte'
  import { roughSvg } from '@/lib/utils/rough'

  import { BOMB_PATH } from './constants'
  import { MinesSweeper } from './MinesSweeper.svelte'

  const game = new MinesSweeper()

  function drawBomb(node: SVGSVGElement) {
    const rough = roughSvg(node)

    BOMB_PATH.forEach((path) => {
      const roughNumberPath = rough!.path(path, game.player1Options)

      node.appendChild(roughNumberPath)
      roughNumberPath.classList.toggle('transform-fill', true)
      roughNumberPath.classList.toggle('origin-top-left', true)
    })

    return () => {
      for (const child of node.children) {
        node.removeChild(child)
      }
    }
  }
</script>

<div class="flex w-[560px] flex-col items-stretch justify-center gap-2">
  <div class="grid grid-cols-3 items-center gap-4">
    <div class="flex items-center justify-start gap-2 py-2">
      <svg class="h-6 w-6" viewBox="0 0 24 24" {@attach drawBomb}> </svg>
      <p class="font-handwritting">
        {game.bombLeft}
      </p>
    </div>
    <div class="justify-self-center">
      {#if game.winner}
        <p class="font-handwritting">YOU WON</p>
      {/if}
    </div>
    <div class="justify-self-end">
      {#if game.isTerminated}
        <div class="flex gap-2">
          {#if !game.isRevealed && !game.winner}
            <Button
              size="sm"
              isLoading={game.isComputing}
              variant="solid-secondary"
              onclick={() => {
                game.revealAllCell()
              }}
            >
              REVEAL
            </Button>
          {/if}
          <Button
            size="sm"
            variant="solid-tertiary"
            isLoading={game.isComputing}
            onclick={() => {
              game.reset()
            }}
          >
            RESET
          </Button>
        </div>
      {:else if game.isComputing}
        <Spinner />
      {/if}
    </div>
  </div>
  <svg
    class="aspect-square w-full transform-fill"
    {@attach (svg: SVGSVGElement) => {
      game.init(svg)

      return () => {
        game.destroy()
      }
    }}
  ></svg>
</div>
