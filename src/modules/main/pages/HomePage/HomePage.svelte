<script lang="ts">
  import { IconX } from '@tabler/icons-svelte'
  import { fade, slide } from 'svelte/transition'

  import { Button } from '@/components/Buttons'
  import { Canvas } from '@/components/Canvas'
  import PageSpinner from '@/components/Spinners/PageSpinner.svelte'
  import { appState } from '@/lib/contexts/AppState'
  import { MinesSweeperBoard } from '@/modules/games/boardGames/MinesSweeper'

  import { MainChat } from '../../components/Chat'
  import { SuspenseFallback } from '../../components/SuspenseFallback'
  import { Scenes } from './scenes'
  import { About } from './sections/About'
  import { Credit } from './sections/Credit'
  import { Experience } from './sections/Experience'
  import { Hero } from './sections/Hero'

  let container = $state<HTMLDivElement>()
</script>

{#snippet loadingFallback()}
  <SuspenseFallback />
{/snippet}

<div
  bind:this={container}
  class="canvas-container fixed full-h w-full"
  style:--scroll-y={appState.creditScrollProgress}
>
  <Canvas {loadingFallback}>
    <Scenes {container} />
  </Canvas>
</div>

{#if appState.isOpenCookiesweeper}
  <div transition:slide class="transform-center fixed z-[200] hidden md:block">
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
  </div>
{/if}

{#if appState.isReady}
  <MainChat />
  <Hero />

  <div in:fade class="z-50 min-h-screen w-full">
    <div class="z-50 min-h-screen w-full"></div>
    <About />
    <Experience />
    <Credit />
  </div>
{:else}
  <PageSpinner />
{/if}

<style>
  .canvas-container {
    --scroll-y: 0;
    transform: translateY(calc(max(var(--scroll-y), 0) * -20vh));
  }
</style>
