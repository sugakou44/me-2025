<script lang="ts">
  import { IconBombFilled, IconX } from '@tabler/icons-svelte'
  import { eases, stagger, utils } from 'animejs'
  import { tick } from 'svelte'
  import { scale } from 'svelte/transition'

  import { animate } from '@/lib/animations/animejs'
  import {
    DURATION_FAST,
    DURATION_NORMAL,
    DURATION_SLOW,
  } from '@/lib/animations/constants'
  import { fade } from '@/lib/animations/transition'
  import { useBreakPointValue } from '@/lib/svelte/breakpointValues.svelte'
  import { cn } from '@/lib/utils/className'
  import { appState } from '@/modules/main/contexts/AppState'

  import { Button } from '../Buttons'
  import Avatar from './Avatar.svelte'
  import ButtonGroup from './ButtonGroup.svelte'

  interface Props {
    forceOpen?: boolean
    isOpen?: boolean
    initialIsIn?: boolean
  }

  let { forceOpen, isOpen = $bindable(false), initialIsIn }: Props = $props()

  const defaultDuration = useBreakPointValue({
    base: 0,
    md: DURATION_SLOW,
  })

  const defaultDelay = useBreakPointValue({
    base: 0,
    md: DURATION_NORMAL,
  })

  const animationDuration = $derived(initialIsIn ? (defaultDuration() ?? 0) : 0)
  const animationDelay = $derived(initialIsIn ? (defaultDelay() ?? 0) : 0)
  const easing = eases.outBack(1.2)

  function buttonGroupAnimation(node: HTMLDivElement) {
    const animation = animate(node.children, {
      scale: [0, 1],
      opacity: [0, 1],
      ease: easing,
      duration: animationDuration,
      delay: (...args) =>
        (stagger(animationDuration / 4)(...args) as number) +
        animationDelay * 5,
    })

    return () => {
      animation.complete()
      utils.remove(node.children)
    }
  }
</script>

<!-- background -->
<div
  class={cn(
    'roate-y-180 absolute inset-0 -translate-z-[2px] overflow-hidden rounded-xl transition-shadow',
    {
      'shadow-md delay-500': !forceOpen && !isOpen,
      'bg-background': !forceOpen,
    },
  )}
></div>

<!-- content -->
<div
  class="section relative aspect-[1/1.65] h-full w-full rounded-xl transform-3d"
>
  {#await tick() then}
    <div
      in:scale={{
        easing,
        opacity: 0.01,
        duration: animationDuration,
        delay: animationDelay,
      }}
      class="absolute right-2 bottom-[15%] left-2 h-[25%] overflow-hidden rounded-lg will-change-transform"
    >
      <div class="halftone-stripe-isometric text-primary"></div>
      <div class=" absolute inset-0"></div>
    </div>
    <figure
      in:scale={{
        easing,
        opacity: 0.01,
        duration: animationDuration,
        delay: animationDelay * 0.5,
      }}
      class="absolute right-2 bottom-2 left-2 will-change-transform md:top-1/5 md:right-[unset] md:bottom-0 md:left-0 md:w-[calc(50%-16px)]"
    >
      <Avatar isIn={!!isOpen || !!forceOpen} />
    </figure>
    <div
      class="relative top-[10%] right-2 bottom-2 left-2 flex flex-col gap-2 md:absolute md:top-2 md:left-1/2"
    >
      <div class="flex-[1]"></div>
      <h1
        in:fade={{
          easing,
          duration: animationDuration * 2,
          delay: animationDelay * 3,
        }}
        class="text-center font-normal text-foreground will-change-opacity md:text-left"
      >
        Hi, I&apos;m
        <span
          class="font-handwritting text-[1.3em] font-bold tracking-wider whitespace-nowrap text-primary-foreground"
        >
          PAAN
          {#if appState.scene !== 'game'}
            <span
              in:scale|global={{
                opacity: 0.01,
                easing: eases.outElastic(2, 0.5),
                duration: animationDuration * 2,
                delay: animationDelay * 8,
              }}
              class="hidden origin-center font-handwritting font-bold tracking-wider text-primary-foreground will-change-transform md:inline-block"
              onclick={() => {
                appState.scene = 'game'
              }}
            >
              <IconBombFilled />
            </span>
            <span
              in:scale|global={{
                opacity: 0.01,
                easing: eases.outElastic(2, 0.5),
                duration: animationDuration * 2,
                delay: animationDelay * 8,
              }}
              class="inline-block origin-center font-handwritting font-bold tracking-wider text-primary-foreground will-change-transform md:hidden"
            >
              .
            </span>
          {:else}
            <span
              in:scale|global={{
                opacity: 0.01,
                easing: eases.outElastic(2, 0.5),
                duration: animationDuration * 2,
                delay: animationDelay * 8,
              }}
              class="inline-block origin-center font-handwritting font-bold tracking-wider text-primary-foreground will-change-transform"
            >
              .
            </span>
          {/if}
        </span>
      </h1>
      <h4
        in:fade={{
          easing,
          duration: animationDuration * 2,
          delay: animationDelay * 4,
        }}
        class="font-header text-center leading-tight font-light will-change-opacity md:text-left"
      >
        <span class="font-medium">Front-end developer</span>
        <br />
        based in Bangkok, Thailand
      </h4>
      <ButtonGroup {@attach buttonGroupAnimation} />
      <div class="flex-[1]"></div>
    </div>
  {/await}

  {#if !forceOpen && isOpen}
    <div
      in:scale={{
        easing: eases.outBack(1.2),
        opacity: 0.01,
        duration: DURATION_FAST,
        delay: DURATION_NORMAL,
      }}
      class="absolute top-6 right-6 will-change-transform"
    >
      <Button
        class="text-foreground/70"
        size="icon"
        variant="ghost"
        onclick={() => {
          isOpen = false
        }}
      >
        <IconX class="h-5 w-5" />
      </Button>
    </div>
  {/if}
</div>

<style>
  .background {
    background-image:
      radial-gradient(
        circle at 20%,
        transparent,
        transparent 60%,
        var(--color-background)
      ),
      radial-gradient(
        circle at 80%,
        transparent,
        transparent 60%,
        var(--color-background)
      );
  }
</style>
