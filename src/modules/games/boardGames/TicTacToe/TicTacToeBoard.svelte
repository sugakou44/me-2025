<script lang="ts">
  import { untrack } from 'svelte'

  import { Button } from '@/components/Buttons'
  import { roughSvg } from '@/lib/utils/rough'

  import { TicTacToe } from './TicTacToe.svelte'

  const game = new TicTacToe()

  const victoryCount = $state({ X: 0, O: 0 })

  $effect(() => {
    const winner = game.winner

    if (!winner) {
      return
    }

    if (winner === 'O') {
      untrack(() => (victoryCount.O += 1))
      return
    }
    untrack(() => (victoryCount.X += 1))
  })

  function drawX(node: SVGSVGElement) {
    const bound = node.getBoundingClientRect()
    const rough = roughSvg(node)

    const offset = bound.width / 5

    const line1 = rough!.line(
      offset,
      offset,
      bound.width - offset,
      bound.height - offset,
      game.player2Options,
    )
    node.appendChild(line1)

    const line2 = rough!.line(
      offset,
      bound.height - offset,
      bound.width - offset,
      offset,
      game.player2Options,
    )
    node.appendChild(line2)

    return () => {
      for (const child of node.children) {
        node.removeChild(child)
      }
    }
  }

  function drawO(node: SVGSVGElement) {
    const bound = node.getBoundingClientRect()
    const rough = roughSvg(node)

    const [halfWidth, halfHeight] = [bound.width / 2, bound.height / 2]

    const circle = rough!.ellipse(
      halfWidth,
      halfHeight,
      halfWidth,
      halfHeight,
      game.player1Options,
    )
    node.appendChild(circle)

    return () => {
      for (const child of node.children) {
        node.removeChild(child)
      }
    }
  }
</script>

<div class="flex w-[200px] flex-col items-stretch justify-center gap-2">
  <div class="flex justify-between gap-4">
    <div class="flex items-center justify-start gap-2 py-2">
      <svg class="h-6 w-6" viewBox="0 0 24 24" {@attach drawO}> </svg>
      <p class="font-handwritting-heading">
        {victoryCount.O}
      </p>
    </div>
    {#if game.isTerminated}
      <Button
        size="sm"
        variant="solid-tertiary"
        onclick={() => {
          if (!game.isTerminated) {
            return
          }

          game.reset()
          game.drawGrid(true)
        }}
      >
        RESET
      </Button>
    {/if}
    <div class="flex items-center justify-end gap-2 py-2">
      <p class="font-handwritting-heading">
        {victoryCount.X}
      </p>
      <svg class="h-6 w-6" viewBox="0 0 24 24" {@attach drawX}></svg>
    </div>
  </div>
  <svg
    class="aspect-square w-full"
    {@attach (svg: SVGSVGElement) => {
      game.init(svg)

      return () => {
        game.destroy()
      }
    }}
  >
  </svg>
</div>
