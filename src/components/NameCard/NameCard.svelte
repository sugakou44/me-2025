<script lang="ts">
  import { page } from '$app/state'
  import { untrack } from 'svelte'
  import { backOut, cubicOut } from 'svelte/easing'
  import { Tween } from 'svelte/motion'
  import { fade, fly, scale } from 'svelte/transition'

  import { DURATION_SLOW, DURATION_SLOWEST } from '@/lib/animations/constants'
  import { ROUTES } from '@/lib/constants/routes'
  import { windowState } from '@/lib/contexts/Window'
  import { useDeviceType } from '@/lib/svelte/breakpointValues.svelte'
  import { cn } from '@/lib/utils/className'
  import { appState } from '@/modules/main/contexts/AppState'

  import { Button } from '../Buttons'
  import { ScrollIndicator } from '../ScrollIndicator'
  import Content from './Content.svelte'

  let isOpen = $state(false)
  let isIn = $state(appState.forceOpenHero)
  let timeoutMs = 0

  const initialIsIn = $derived(appState.maximizeAtTop)

  $effect(() => {
    const newIsIn = appState.forceOpenHero || isOpen

    const timer = setTimeout(() => {
      isIn = newIsIn
      timeoutMs = 100
    }, timeoutMs)

    return () => {
      clearTimeout(timer)
    }
  })

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
    if (!appState.isInHero && untrack(() => isOpen) && appState.maximizeAtTop) {
      isOpen = appState.isInHero
    }
  })

  $effect(() => {
    if (windowState.pathname && untrack(() => isOpen)) {
      isOpen = false
    }
  })
</script>

{#if page.status < 400 && page.url.pathname !== ROUTES.sandbox.pathname}
  <div
    in:fly={{
      y: initialIsIn ? 0 : -100,
      opacity: 0.01,
      duration: DURATION_SLOW,
      easing: backOut,
    }}
    class={cn(
      'pointer-events-none fixed inset-4 z-50 will-change-transform md:inset-6 print:hidden',
    )}
  >
    {#if appState.forceOpenHero}
      <div
        transition:scale={{
          duration: DURATION_SLOW,
          easing: cubicOut,
        }}
        class="absolute inset-0 hidden bg-background/80 will-change-transform md:block"
      ></div>
    {/if}
    <div
      style:transform={contentTransform}
      class="pointer-events-auto absolute top-[45%] left-[50%] container mx-auto aspect-[1/1.65] w-full will-change-transform transform-3d md:aspect-[1.65] md:max-h-none xl:max-w-5xl"
    >
      <Content bind:isOpen forceOpen={appState.forceOpenHero} {initialIsIn} />
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
    {#if appState.forceOpenHero}
      <div
        in:fade|global={{
          duration: DURATION_SLOWEST * 1.5,
          delay: DURATION_SLOWEST * 4,
          easing: backOut,
        }}
        out:fade={{
          duration: DURATION_SLOW,
          easing: cubicOut,
        }}
        class="absolute bottom-0 left-8 z-50 -translate-x-1/2 -translate-y-full print:hidden"
      >
        <ScrollIndicator />
      </div>
    {/if}
  </div>
{/if}
