<script lang="ts">
  import { Chess } from './Chess.svelte'

  let canvas: SVGSVGElement | null = null

  const game = new Chess()

  $effect(() => {
    if (!canvas) {
      return
    }

    game.init(canvas)

    return () => {
      game.destroy()
    }
  })
</script>

<div class="flex flex-col items-center justify-center gap-10">
  <div class="flex justify-center">
    <svg bind:this={canvas} class="h-[500px] w-[500px] transform-fill"></svg>
  </div>
</div>
