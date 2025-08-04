<script lang="ts">
  import { untrack } from 'svelte'
  import { backOut, cubicOut } from 'svelte/easing'
  import { Tween } from 'svelte/motion'
  import { fly, scale } from 'svelte/transition'

  import { DURATION_NORMAL, DURATION_SLOW } from '@/lib/animations/constants'
  import { useDeviceType } from '@/lib/svelte/breakpointValues.svelte'
  import { appState } from '@/modules/main/contexts/AppState'

  import { Button } from '../Buttons'
  import Content from './Content.svelte'

  let isOpen = $state(false)

  const isIn = $derived(appState.shouldShowHeroDecorator || isOpen)
  const initialIsIn = true

  const deviceType = useDeviceType()

  const contentAnimation = new Tween(untrack(() => isIn) ? 0 : 1, {
    duration: DURATION_SLOW,
  })

  const contentTransform = $derived.by(() => {
    const { isDesktop } = deviceType()

    const t = contentAnimation.current

    if (isDesktop) {
      return `translate3d(-50%, calc(${-45 * t}vh + -50% + 0px), 0) scale(${1 - 0.5 * t}) rotateY(${-180 * t}deg) rotateZ(${90 * t}deg) translate3d(calc(${-50 * t}% + ${96 * t}px), calc(0% + 0px), 0)
		`
    }

    return `
		translate3d(-50%, calc(${-45 * t}vh + -50% + 0px), 0) scale(${1 - 0.5 * t}) rotateY(${-180 * t}deg) rotateZ(0deg) translate3d(calc(0% + 0px), calc(${-50 * t}% + ${96 * t}px), 0)
	`
  })

  $effect(() => {
    contentAnimation.set(isIn ? 0 : 1, {
      easing: isIn ? backOut : cubicOut,
    })
  })

  $effect(() => {
    if (!appState.shouldShowHeroDecorator) {
      isOpen = false
    }
  })
</script>

<div
  in:fly={{
    y: initialIsIn ? 0 : -100,
    opacity: 0.01,
    duration: DURATION_SLOW,
    easing: backOut,
  }}
  class="pointer-events-none fixed inset-4 z-50 will-change-transform md:inset-6"
>
  {#if appState.shouldShowHeroDecorator}
    <div
      in:scale={{
        opacity: 0.01,
        duration: DURATION_NORMAL,
        easing: backOut,
      }}
      out:scale={{
        opacity: 0.01,
        duration: DURATION_SLOW,
        easing: cubicOut,
      }}
      class="absolute inset-0 bg-background/80 will-change-transform"
    ></div>
  {/if}
  <div
    style:transform={contentTransform}
    class="section pointer-events-auto absolute top-[45%] left-[50%] aspect-[1/1.65] w-full will-change-transform transform-3d md:aspect-[1.65] md:max-h-none"
  >
    <Content
      bind:isOpen
      forceOpen={appState.shouldShowHeroDecorator}
      {initialIsIn}
    />
    {#if !isIn}
      <div class="absolute inset-1 -translate-z-1">
        <div
          class="absolute right-0 bottom-0 !h-[96px] w-full -scale-x-100 md:top-[50%] md:right-12 md:w-[calc(100%/1.65)] md:translate-x-[50%] md:translate-y-[-50%] md:-rotate-90"
        >
          <div
            class="halftone-stripe absolute inset-4 bottom-0 rounded-t-none rounded-b-lg text-primary"
          ></div>
          <Button
            variant="puller"
            class="!h-full w-full rounded-t-none rounded-b-xl bg-transparent text-2xl md:text-3xl [&:hover>span]:shadow-lg"
            onclick={() => {
              isOpen = true
            }}
          >
            <span
              class="pointer-events-none rounded-full bg-background px-10 py-5 text-primary-foreground"
            >
              CONTACT
            </span>
          </Button>
        </div>
      </div>
    {/if}
  </div>
</div>
