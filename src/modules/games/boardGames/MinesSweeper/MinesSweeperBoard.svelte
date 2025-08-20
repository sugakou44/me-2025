<script lang="ts">
  import Button from '@/components/Buttons/Button.svelte'
  import Spinner from '@/components/Spinners/Spinner.svelte'
  import DrawingText from '@/components/Text/DrawingText.svelte'
  import HintText from '@/components/Text/HintText.svelte'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { toggleClass } from '@/lib/utils/className'
  import { roughSvg } from '@/lib/utils/rough'

  import { BOMB_PATH } from './constants'
  import { MinesSweeper } from './MinesSweeper.svelte'

  interface Props {
    isOpen?: boolean
  }

  const { isOpen: isOpenProp = false }: Props = $props()
  let isOpen = $state(false)

  $effect(() => {
    if (isOpenProp && !isOpen) {
      isOpen = true
    }
  })

  const game = new MinesSweeper()

  function drawBomb(node: SVGSVGElement) {
    const rough = roughSvg(node)

    BOMB_PATH.forEach((path) => {
      const roughNumberPath = rough!.path(path, game.player1Options)

      node.appendChild(roughNumberPath)
      toggleClass(roughNumberPath, 'transform-fill origin-top-left', true)
    })

    return () => {
      for (const child of node.children) {
        node.removeChild(child)
      }
    }
  }
</script>

<div
  class="flex h-[669px] w-[560px] flex-col items-stretch justify-center gap-2 p-6 pt-4 pb-8"
  {@attach squircleBackground({
    cornerRadius: 16,
    cornerSmoothing: 1,
    class: 'fill-white -z-10',
  })}
>
  <DrawingText
    as="h2"
    content="Cookies sweeper"
    isIn={isOpen}
    class="mx-auto  leading-[1.1]"
    animationOptions={{
      draw: !isOpen ? '0 0.001' : '0 0.4',
      // scale: isOpen ? 2 : 1,
    }}
  />
  <div class="z-50 grid grid-cols-3 items-center gap-4">
    <div class="flex items-center justify-start gap-2 py-2">
      <svg class="h-6 w-6" viewBox="0 0 24 24" {@attach drawBomb}> </svg>
      <p class="font-handwritting-heading">
        {game.bombLeft}
      </p>
    </div>
    <div class="justify-self-center">
      {#if game.winner}
        <p class="font-handwritting-heading">YOU WON</p>
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
              game.reset(true)
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
  <HintText class="bottom-1">
    Left click to reveal | Right click to mark cookie
  </HintText>
</div>
