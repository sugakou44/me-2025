<script lang="ts">
  import { Canvas } from '@/components/Canvas'
  import PageSpinner from '@/components/Spinners/PageSpinner.svelte'
  import { appState } from '@/modules/main/contexts/AppState'

  import { SuspenseFallback } from '../../components/SuspenseFallback'
  import { Scenes } from './scenes'
  import Chapter1 from './sections/Chapter1.svelte'
  import Chapter2 from './sections/Chapter2.svelte'
  import Chapter3 from './sections/Chapter3.svelte'
  import Chapter4 from './sections/Chapter4.svelte'
  import Chapter5 from './sections/Chapter5.svelte'
  import Credit from './sections/Credit.svelte'
  import Epilogue from './sections/Epilogue.svelte'
  import Hero from './sections/Hero.svelte'
  import Prologue from './sections/Prologue.svelte'
  import Spacer from './sections/Spacer.svelte'

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

{#if appState.isReady}
  <Hero />

  <div class="z-50 w-full">
    <div class="z-50 min-h-screen w-full"></div>
    <Prologue />
    <Spacer />
    <Spacer />
    <Chapter1 />
    <Spacer />
    <Chapter2 />
    <Spacer />
    <Chapter3 />
    <Spacer />
    <Chapter4 />
    <Spacer />
    <Chapter5 />
    <Spacer />
    <Epilogue />
    <Credit />
  </div>
{:else}
  <PageSpinner />
{/if}

<style>
  .canvas-container {
    --scroll-y: 0;
    transform: translateY(calc(max(var(--scroll-y), 0) * -100vh));
  }
</style>
