<script lang="ts">
  import { IconX } from '@tabler/icons-svelte'
  import { fade, slide } from 'svelte/transition'

  import { Button } from '@/components/Buttons'
  import { Canvas } from '@/components/Canvas'
  import PageSpinner from '@/components/Spinners/PageSpinner.svelte'
  import RockingSpinner from '@/components/Spinners/RockingSpinner.svelte'
  import { DURATION_FAST } from '@/lib/animations/constants'
  import { appState } from '@/lib/contexts/AppState'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { cn } from '@/lib/utils/className'

  import { SuspenseFallback } from '../../components/SuspenseFallback'
  import { Scenes } from './scenes'
  import { About } from './sections/About'
  import { Credit } from './sections/Credit'
  import { Experience } from './sections/Experience'
  import { Hero } from './sections/Hero'
  import Spacer from './Spacer.svelte'

  let container = $state<HTMLDivElement>()
  let gameLoader = $state<Promise<any>>()
  let chatLoader = $state<Promise<any>>()

  $effect.pre(() => {
    if (appState.isOpenCookiesweeper && !gameLoader) {
      gameLoader = import('@/modules/games/boardGames/MinesSweeper')
    }
  })

  $effect.pre(() => {
    if (appState.isIntroAnimationEnded && !chatLoader) {
      chatLoader = import('../../components/Chat')
    }
  })
</script>

{#snippet loadingFallback()}
  <SuspenseFallback />
{/snippet}

<div
  bind:this={container}
  class="canvas-container fixed top-0 h-[100lvh] w-full"
  style:--scroll-y={appState.creditScrollProgress}
>
  <Canvas {loadingFallback}>
    <Scenes {container} />
  </Canvas>
</div>

{#if gameLoader && appState.isOpenCookiesweeper}
  <div transition:slide class="transform-center fixed z-[200] hidden md:block">
    <div
      class="flex h-[669px] w-[560px] flex-col items-stretch justify-center gap-2 rounded-4xl p-6 pt-4 pb-8 shadow-2xl"
      {@attach squircleBackground({
        cornerRadius: 16,
        cornerSmoothing: 1,
        class: 'fill-white -z-10',
      })}
    >
      {#await gameLoader}
        <div
          out:fade={{
            duration: DURATION_FAST,
          }}
          class="transform-center absolute"
        >
          <RockingSpinner />
        </div>
      {:then { MinesSweeperBoard }}
        <MinesSweeperBoard isOpen={appState.isOpenCookiesweeper} />
        <Button
          variant="ghost"
          size="icon"
          class="absolute top-4 right-4"
          onclick={() => {
            appState.isOpenCookiesweeper = false
          }}
        >
          <IconX />
        </Button>
      {/await}
    </div>
  </div>
{/if}
{#if chatLoader && appState.isIntroAnimationEnded}
  {#await chatLoader then { MainChat }}
    <MainChat />
  {/await}
{/if}

<div
  class={cn('contents', {
    'fixed inset-0 -z-50 block': !appState.isReady,
  })}
>
  <Hero />

  <div in:fade class="z-50 min-h-dvh w-full">
    <div class="z-50 min-h-dvh w-full"></div>
    <Spacer />
    <About />
    <Experience />
    <Credit />
  </div>
</div>

{#if !appState.isReady}
  <PageSpinner />
{/if}

<style>
  .canvas-container {
    --scroll-y: 0;
    transform: translateY(calc(max(var(--scroll-y), 0) * -20vh));
  }
</style>
