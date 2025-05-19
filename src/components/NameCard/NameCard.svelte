<script lang="ts">
  import { tick, untrack } from 'svelte'
  import { backOut, cubicOut } from 'svelte/easing'
  import { Tween } from 'svelte/motion'
  import { fly, scale } from 'svelte/transition'

  import {
    DURATION_FAST,
    DURATION_NORMAL,
    DURATION_SLOW,
  } from '@/lib/animations/constants'
  import { getDeviceType } from '@/lib/svelte/breakpointValues.svelte'

  import { Button } from '../Buttons'
  import Content from './Content.svelte'
  import { isAtTop, shouldMaximizeAtTop } from './utils.svelte'

  let isOpen = $state(false)
  const maximizeAtTop = shouldMaximizeAtTop()
  const atTop = isAtTop()
  const forceOpen = $derived(maximizeAtTop() && atTop())
  const isIn = $derived(forceOpen || isOpen)
  const initialIsIn = $derived(untrack(() => isIn))

  const deviceType = getDeviceType()

  const contentAnimation = new Tween(untrack(() => isIn) ? 0 : 1, {
    duration: DURATION_NORMAL,
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
      delay: forceOpen ? 0 : DURATION_FAST,
    })
  })

  $effect(() => {
    if (!forceOpen) {
      isOpen = false
    }
  })
</script>

{#await tick() then}
  <div
    in:fly={{
      y: initialIsIn ? 0 : -100,
      opacity: 0,
      duration: DURATION_SLOW,
      easing: backOut,
    }}
    class="fixed inset-4 z-50 md:inset-6"
  >
    {#if forceOpen}
      <div
        in:scale={{
          duration: DURATION_NORMAL,
          easing: backOut,
        }}
        out:scale={{
          duration: DURATION_SLOW,
          easing: cubicOut,
        }}
        class="absolute inset-0 bg-background"
      ></div>
    {/if}
    <div
      style:transform={contentTransform}
      class="section absolute top-[45%] left-[50%] aspect-[1/1.65] w-full transform-3d md:aspect-[1.65]"
    >
      <Content bind:isOpen {forceOpen} {initialIsIn} />
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
{/await}
