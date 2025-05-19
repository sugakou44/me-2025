<script lang="ts">
  import { IconPointerFilled } from '@tabler/icons-svelte'
  import { utils } from 'animejs'
  import { Spring, Tween } from 'svelte/motion'

  import {
    DURATION_FASTEST,
    DURATION_SLOWEST,
    FAST_SPRING_CONFIG,
  } from '@/lib/animations/constants'
  import { gestures } from '@/lib/svelte/gestures.svelte'
  import { cn } from '@/lib/utils/className'
  import { centerPointOrigin, normalize } from '@/lib/utils/math'

  interface Props {
    onGrab: () => void
    gotCursor: boolean
    class?: string
  }

  const BOUNDS = 250
  const OVER_REACH_BOUNDS = 160
  const REACH_BOUNDS = 110

  const { gotCursor, onGrab, class: className }: Props = $props()

  let prevAngle = 0
  let container: HTMLDivElement | null = null

  const handSpring = new Spring(
    {
      x: 0,
      y: 0,
      rotate: 0,
    },
    FAST_SPRING_CONFIG,
  )

  const handOpacitySpring = new Tween(0, { duration: DURATION_SLOWEST })

  $effect(() => {
    if (gotCursor) {
      handOpacitySpring.set(1, {
        duration: 0,
      })
      handOpacitySpring.set(0, {
        delay: 500,
        duration: DURATION_SLOWEST,
      })
    }
  })
</script>

<svelte:window
  {@attach gestures({
    onMove: ({ xy: [mouseX, mouseY] }) => {
      const { width, height, x, y } = container!.getBoundingClientRect()

      const [centerX, centerY] = centerPointOrigin(
        [x, y],
        [Math.floor(width / 2), Math.floor(height / 2)],
      )
      const [rawDiffX, rawDiffY] = [mouseX - centerX!, mouseY - centerY!]

      const angle = Math.atan2(-rawDiffY, rawDiffX)
      const radius = Math.sqrt(rawDiffY * rawDiffY + rawDiffX * rawDiffX)

      const clamppedRadius = utils.clamp(radius, 0, REACH_BOUNDS)

      const [reachX, reachY] = [
        radius * Math.cos(angle),
        -radius * Math.sin(angle),
      ]
      const [diffX, diffY] = [
        clamppedRadius * Math.cos(angle),
        -clamppedRadius * Math.sin(angle),
      ]

      const shouldGrabCursor = radius < OVER_REACH_BOUNDS

      if (!gotCursor && shouldGrabCursor) {
        onGrab()

        handOpacitySpring.set(1, { instant: true })
        handSpring.set(
          {
            x: reachX,
            y: reachY,
            rotate: Math.PI / 2 - angle,
          },
          {
            instant: true,
          },
        )
      }

      const isGrabbingCursor = gotCursor || shouldGrabCursor

      const opacity = utils.clamp(
        1 - normalize(Math.abs(radius), BOUNDS, BOUNDS * 3),
        0,
        1,
      )

      handOpacitySpring.set(isGrabbingCursor ? 0 : opacity, {
        delay: isGrabbingCursor ? 500 : 0,
        duration: isGrabbingCursor ? DURATION_SLOWEST : DURATION_FASTEST,
      })

      handSpring.set(
        {
          x: isGrabbingCursor ? 0 : diffX,
          y: isGrabbingCursor ? 0 : diffY,
          rotate: isGrabbingCursor ? utils.degToRad(-135) : Math.PI / 2 - angle,
        },
        {
          instant: Math.abs(prevAngle - angle) > Math.PI / 2,
        },
      )

      prevAngle = angle
    },
  })}
/>

<div
  bind:this={container}
  class={cn(
    'absolute hidden aspect-square h-10 w-10 rounded-full md:block',
    className,
  )}
>
  <div
    style:opacity={handOpacitySpring.current}
    style:transform={`translate3d(${handSpring.current.x}px, ${handSpring.current.y}px, 50px) rotate(${handSpring.current.rotate}rad)`}
    class="relative h-full w-full"
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 2835 2835"
      class="overflow-visible"
    >
      <circle
        cx="1417.32"
        cy="1285.56"
        r="1225.56"
        class="fill-primary stroke-0"
      />
      <path
        d="M1417.32,0c-1259.79,-11.817 -1271.17,1080.87 -1285.56,1285.56c-44.133,627.697 -6.484,775.802 -0,1100.28c12.133,607.191 468.984,523.043 475.437,26.4c4.483,-345.038 526.215,-290.753 530.64,81.6c4.509,379.424 507.592,560.398 536.4,12c29.917,-569.515 509.542,-425.258 490.08,65.28c-21.851,550.759 433.779,148.486 486,-124.08c60.536,-315.963 54.021,-677.054 52.563,-1161.48c-1.74,-578.08 -31.004,-1273.79 -1285.56,-1285.56Z"
        class="fill-white drop-shadow-[0px_0px_400px_var(--color-primary)]"
      />
    </svg>
    {#if gotCursor}
      <IconPointerFilled
        class="transform-center absolute scale-80 rotate-135 text-foreground"
      />
    {/if}
  </div>
</div>
