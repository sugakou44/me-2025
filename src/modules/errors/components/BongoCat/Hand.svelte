<script lang="ts">
  import { utils } from 'animejs'
  import { Spring } from 'svelte/motion'

  import { FAST_SPRING_CONFIG } from '@/lib/animations/constants'
  import { gestures } from '@/lib/svelte/gestures.svelte'
  import { cn } from '@/lib/utils/className'

  interface Props {
    onHit: (mousePos: Point2d) => void
    haveCursor: boolean
    minimumReach?: number
    class?: string
  }

  const OVER_REACH_BOUNDS = 130
  const REACH_BOUNDS = 100

  const {
    class: className,
    onHit,
    haveCursor,
    minimumReach = 40,
  }: Props = $props()

  let handElement: SVGSVGElement | null = null
  let ghostElement: HTMLDivElement | null = null

  const handSpring = new Spring(
    { y: 0, scale: 1, rotate: 0 },
    FAST_SPRING_CONFIG,
  )
</script>

<svelte:window
  {@attach gestures({
    onMove: ({ xy: [mouseX, mouseY] }) => {
      const { y, height, x, width } = ghostElement!.getBoundingClientRect()

      const diffY = Math.min(mouseY - (y + height / 2), 0)
      const gutter = width / 4
      if (utils.clamp(mouseX, x + gutter, x + width - gutter) !== mouseX) {
        handSpring.set({
          y: 0,
          scale: 1,
          rotate: 0,
        })
        return
      }

      const shouldGrabCursor =
        Math.abs(diffY) >= minimumReach && Math.abs(diffY) < OVER_REACH_BOUNDS

      if (!haveCursor && shouldGrabCursor) {
        onHit([mouseX, mouseY])
        handSpring.set(
          {
            y: utils.clamp(diffY, -OVER_REACH_BOUNDS, 0),
            scale: 1.2,
            rotate: -12,
          },
          {
            instant: true,
          },
        )

        return
      }

      const isGrabbingCursor = haveCursor || shouldGrabCursor

      handSpring.set({
        y: isGrabbingCursor ? 0 : utils.clamp(diffY, -REACH_BOUNDS, 0),
        scale: 1,
        rotate: 0,
      })
    },
  })}
/>

<div
  bind:this={ghostElement}
  class={cn(
    'transfrom-center invisible absolute z-20 aspect-square w-[20%] max-w-[200px] origin-bottom',
    className,
  )}
></div>
<div
  class="absolute z-20 aspect-square h-fit w-[20%] max-w-[200px] origin-right"
  style:transform={`translateY(${handSpring.current.y}px) scale(${handSpring.current.scale}) rotate(${handSpring.current.rotate}deg)`}
>
  <svg
    bind:this={handElement}
    class={cn('transfrom-center absolute aspect-square w-full', className)}
    viewBox="0 0 512 512"
  >
    <path
      d="M68.494,454.5c-9.5,-58.833 87.362,-312.083 166,-311.579c77.986,0.499 172.912,194.055 170,250.644c-7.201,139.943 -327.176,115.577 -336,60.935Z"
      style:fill="var(--secondary-foreground)"
      style:stroke-width="8px"
      style:stroke="var(--secondary)"
    />
    <path
      d="M233,217.476c-7.48,0 -11.237,2.289 -16.609,10.462l-1.383,2.164l-2.238,3.741c-0.268,0.46 -0.534,0.92 -0.799,1.381c-1.36,2.36 -3.236,4.095 -6.454,6.21l-3.117,1.984c-5.327,3.41 -8.115,6.08 -9.673,10.631c-0.703,1.838 -1.111,4.638 -1.094,6.96c0,9.173 6.789,16.28 15.867,16.28l1.371,-0.033c0.675,-0.033 1.326,-0.092 2.006,-0.185l1.406,-0.234l0.748,-0.152l1.649,-0.397l0.918,-0.245l3.23,-0.924l4.323,-1.321l2.579,-0.74c3.003,-0.815 5.326,-1.207 7.27,-1.207c1.949,0 4.267,0.397 7.27,1.207l2.579,0.74l4.329,1.316l3.224,0.929l1.768,0.457c0.55,0.131 1.06,0.245 1.547,0.337l1.406,0.234c0.68,0.093 1.331,0.152 2.006,0.185l1.371,0.033c9.078,-0 15.867,-7.107 15.867,-16.313c-0,-2.322 -0.414,-5.106 -1.173,-7.101c-1.338,-3.937 -3.837,-6.65 -8.387,-9.951l-1.456,-1.033l-2.992,-2.066c-3.638,-2.556 -5.684,-4.492 -7.101,-6.949l-1.53,-2.638l-1.428,-2.349c-5.729,-9.222 -9.168,-11.413 -17.3,-11.413Z"
      style:fill="white"
      style:fill-rule="nonezero"
    />
    <circle cx="192" cy="225.644" r="14" style:fill="white" />
    <circle cx="213.957" cy="197.644" r="14" style:fill="white" />
    <circle cx="250" cy="197.644" r="14" style:fill="white" />
    <circle cx="274.867" cy="225.644" r="14" style:fill="white" />
  </svg>
</div>
