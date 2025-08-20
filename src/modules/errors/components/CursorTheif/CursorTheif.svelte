<script lang="ts">
  import { IconBookmarkFilled } from '@tabler/icons-svelte'
  import { utils } from 'animejs'
  import { Spring } from 'svelte/motion'

  import { DialogBox } from '@/components/DialogBox'
  import {
    DURATION_FASTEST,
    SLOWEST_SPRING_CONFIG,
  } from '@/lib/animations/constants'
  import { scaleY } from '@/lib/animations/transition'
  import { useBreakPointValue } from '@/lib/svelte/breakpointValues.svelte'
  import { gestures } from '@/lib/svelte/gestures.svelte'
  import { cn } from '@/lib/utils/className'

  import Hand from './Hand.svelte'

  interface Props {
    class?: string
    hideShadow?: boolean
    boundSize?: number
  }

  let { hideShadow, boundSize = 200, class: className }: Props = $props()

  let container = $state<HTMLDivElement>()

  const DEG60 = utils.degToRad(60)
  const DIALOG_BOUNDS = {
    base: 50,
    md: 100,
  } as const

  let gotCursor = $state(false)

  const dialogBound = useBreakPointValue(DIALOG_BOUNDS)

  const bodySpring = new Spring(
    {
      x: 0,
      y: 0,
    },
    SLOWEST_SPRING_CONFIG,
  )
  const eyeSpring = new Spring(
    {
      x: 0,
      y: 0,
    },
    SLOWEST_SPRING_CONFIG,
  )
  const shadowSpring = new Spring(
    {
      x: 0,
      y: 0,
      scale: 1,
    },
    SLOWEST_SPRING_CONFIG,
  )

  $effect(() => {
    if (!gotCursor) {
      window.document.body.classList.toggle('!cursor-none', false)
      return
    }

    window.document.body.classList.toggle('!cursor-none', true)
    const timer = setTimeout(() => {
      gotCursor = false
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  })

  $effect(() => {
    if (gotCursor) {
      bodySpring.set({
        x: 0,
        y: 0,
      })

      eyeSpring.set({
        x: 0,
        y: 0,
      })

      shadowSpring.set({
        x: 0,
        y: 0,
        scale: 1,
      })
    }
  })
</script>

<svelte:window
  {@attach gestures({
    onMove: ({ xy: [mouseX, mouseY] }) => {
      if (!container) return
      if (gotCursor) {
        bodySpring.set({
          x: 0,
          y: 0,
        })

        eyeSpring.set({
          x: 0,
          y: 0,
        })

        shadowSpring.set({
          x: 0,
          y: 0,
          scale: 1,
        })

        return
      }

      const containerBound = container.getBoundingClientRect()

      const centerX = containerBound.right - containerBound.width / 2
      const centerY = containerBound.bottom - containerBound.height / 2

      const [x, y] = [
        utils.clamp(mouseX - centerX, -boundSize, boundSize),
        utils.clamp(mouseY - centerY, -boundSize, 0),
      ]

      const [diffX, diffY] = [x / 3, y / 3]

      bodySpring.set({
        x: diffX,
        y: diffY,
      })

      shadowSpring.set({
        x: diffX + Math.abs(diffY) * Math.cos(DEG60),
        y: diffY * Math.sin(DEG60),
        scale: 1 + Math.abs(diffY) * 0.004,
      })

      eyeSpring.set({
        x: Math.round(diffX / 12),
        y: Math.round(diffY / 12),
      })
    },
  })}
/>

<div class={cn('relative h-full w-full', className)} bind:this={container}>
  <div class="relative h-fit w-28 md:w-52">
    <div
      style:transform={`translate3d(calc(-50% + ${bodySpring.current.x}px), calc(-50% + ${bodySpring.current.y}px), 50px)`}
      class="absolute top-1/2 left-1/2 aspect-square h-28 w-28 perspective-dramatic md:h-52 md:w-52"
    >
      <div
        style:transform={`translate3d(${eyeSpring.current.x}px, ${eyeSpring.current.y}px, 0px)`}
        class={cn(
          'absolute top-[30%] left-[20%] h-3 w-3 scale-y-140 rounded-full bg-primary-foreground md:h-6 md:w-6',
          {
            'top-[35%] !h-1': gotCursor,
          },
        )}
      ></div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 2835 3035"
        style="fill-rule: evenodd; clip-rule: evenodd;stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 1.5;"
      >
        <circle
          cx="1417.32"
          cy="1285.56"
          r="1225.56"
          class="fill-primary stroke-0"
        />
        <path
          d="M1417.32,0c-1259.79,-11.817 -1271.17,1080.87 -1285.56,1285.56c-44.133,627.697 -6.484,775.802 -0,1100.28c12.133,607.191 468.984,523.043 475.437,26.4c4.483,-345.038 526.215,-290.753 530.64,81.6c4.509,379.424 507.592,560.398 536.4,12c29.917,-569.515 509.542,-425.258 490.08,65.28c-21.851,550.759 433.779,148.486 486,-124.08c60.536,-315.963 54.021,-677.054 52.563,-1161.48c-1.74,-578.08 -31.004,-1273.79 -1285.56,-1285.56Z"
          class="scale-y-105 fill-white"
        />
      </svg>
      <div
        style:transform={`translate3d(${eyeSpring.current.x}px, ${eyeSpring.current.y}px, 0px)`}
        class={cn(
          'absolute top-[30%] right-[20%] h-3 w-3 scale-y-140 rounded-full bg-primary-foreground md:h-6 md:w-6',
          {
            'top-[35%] !h-1': gotCursor,
          },
        )}
      ></div>
      <div
        class="absolute right-[40%] bottom-[15%] rotate-90 font-mono text-[1.5rem] font-bold text-primary-foreground md:text-[3rem]"
      >
        {#if gotCursor}
          <div>
            )
            <div
              in:scaleY={{ opacity: 0, start: 0, duration: DURATION_FASTEST }}
              class="absolute right-[15%] bottom-[45%] origin-bottom scale-x-150 rotate-90"
            >
              <IconBookmarkFilled class=" h-3 w-3  md:h-6 md:w-6" />
            </div>
          </div>
        {:else}
          <div>)</div>
        {/if}
      </div>

      <Hand
        onGrab={() => {
          gotCursor = true
        }}
        class="top-1/2 left-[10%]"
        {gotCursor}
      />
      <DialogBox
        position={[dialogBound()!, 0]}
        heightOffset={60}
        label={gotCursor ? 'Gotcha' : 'Are you lost?'}
      />
    </div>
    {#if !hideShadow}
      <div
        style:transform={`translate3d(${shadowSpring.current.x}px, ${shadowSpring.current.y}px, 0px) scale(${shadowSpring.current.scale})`}
        class="absolute inset-0"
      >
        <div
          style:--size={`${(1 / shadowSpring.current.scale) * 0.06}em`}
          style:--stop1={`${(1 / shadowSpring.current.scale) * 0.01}em`}
          style:--stop2={`${(1 / shadowSpring.current.scale) * 0.01}em`}
          class="halftone absolute inset-0 -z-50 aspect-square h-24 w-24 translate-x-5 translate-y-[50%] -translate-z-5 rotate-x-60 -skew-x-30 rounded-full text-primary [--size:0.06em] [--stop1:0.01em] [--stop2:0.01em] perspective-dramatic md:h-48 md:w-48 [&::after]:rounded-full [&::after]:text-[200px] md:[&::after]:text-[400px]"
        ></div>
      </div>
    {/if}
  </div>
</div>
