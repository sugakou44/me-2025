<script lang="ts">
  import { IconPointerFilled } from '@tabler/icons-svelte'
  import { utils } from 'animejs'
  import { Spring } from 'svelte/motion'

  import { SLOW_SPRING_CONFIG } from '@/lib/animations/constants'

  import Hand from './Hand.svelte'

  let hitAtPos = $state<Point2d | null>(null)
  const haveCursor = $derived(!!hitAtPos)

  function onHit(mousePos: Point2d) {
    if (hitAtPos) {
      return
    }

    hitAtPos = mousePos
  }

  const mouseIconSpring = new Spring(
    {
      x: 0,
      y: 0,
      opacity: 0,
    },
    SLOW_SPRING_CONFIG,
  )

  $effect(() => {
    if (!hitAtPos) {
      window.document.body.classList.toggle('!cursor-none', false)
      return
    }

    window.document.body.classList.toggle('!cursor-none', true)

    mouseIconSpring.set(
      {
        x: hitAtPos[0],
        y: hitAtPos[1],
        opacity: 1,
      },
      { instant: true },
    )
    mouseIconSpring.set({
      x: hitAtPos[0] - utils.random(0, window.innerWidth),
      y: hitAtPos[1] + utils.random(0, window.innerHeight),
      opacity: 0,
    })

    const timer = setTimeout(() => {
      hitAtPos = null
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  })
</script>

<figure class="absolute inset-0 flex items-center justify-center">
  <svg
    class="aspect-square w-full max-w-[1000px] translate-y-[-5%]"
    viewBox="0 0 1024 1024"
  >
    <path
      d="M492.5 383.5C482.524 363.304 475.944 354.326 464 343C451.737 352.61 432.357 379.001 431.5 379.5C430.643 379.999 430.106 380.226 429 380.5C392.364 393.024 372.987 402.985 341 426C302.228 455.058 282.536 473.546 251 510.5C244.571 518.144 242.164 522.889 238.5 532.5C237.349 539.334 237.365 543.166 238.5 550C241.448 558.922 245.308 562.208 255.5 565.5C263.886 566.508 268.711 566.465 277.5 565.5C304.467 560.249 318.678 555.276 342.5 543L342.563 542.963C344.636 541.752 345.971 540.972 349.5 542L545 591.5C548.079 592.418 549.535 592.184 551.5 590C556.603 584.26 558.137 582.671 564 577.5C566.744 575.62 567.745 575.252 570.5 577.5C572.736 579.613 573.078 581.264 571 583C559.296 592.892 554.993 599.229 551.5 612C550.922 616.474 550.929 619.104 551.5 624C553.793 633.432 557.301 636.491 567.5 638C577.265 638.569 582.739 638.569 592.5 638C617.84 634.71 631.287 631.277 654 622.5C659.791 620.063 663.191 619.321 669.5 619H688C690.867 619.147 691.305 620.18 691.5 622.5C691.832 624.819 691.157 625.834 688 627C710.306 633.234 722.785 636.183 745 640.5C745.604 604.06 737.034 581.204 705.5 536C721.985 494.887 726.187 473.091 724.5 436.5C701.508 440.479 690.032 445.553 672 459.5C605.309 417.715 566.15 399.768 492.5 383.5Z"
      style:stroke="var(--secondary-foreground)"
      style:fill="var(--secondary-foreground)"
      style:stroke-linecap="round"
    />
    <path
      d="M403 444.994C411.646 444.951 427.287 461.457 426.761 473.219"
      stroke="white"
      stroke-width="9"
      stroke-linecap="round"
      fill="none"
    />
    <path
      d="M573.408 501.073C566.056 496.523 544.098 502.433 538.406 512.74"
      stroke="white"
      stroke-width="9"
      stroke-linecap="round"
      fill="none"
    />
    <circle cx="395" cy="486" r="13" fill="white" />
    <circle cx="556" cy="537" r="13" fill="white" />
    <path
      d="M442 512C464.56 504.569 474.351 507.521 487 525.5C474.475 507.894 464.731 504.648 442 512Z"
      stroke="white"
      stroke-width="9"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <Hand
    class="translate-x-[-100%] translate-y-[-10%]"
    {onHit}
    {haveCursor}
    minimumReach={50}
  />
  <Hand class="translate-x-[60%] translate-y-[30%]" {onHit} {haveCursor} />

  {#if hitAtPos}
    <IconPointerFilled
      style={`top: ${mouseIconSpring.current.y}px; left: ${mouseIconSpring.current.x}px; opacity: ${mouseIconSpring.current.opacity};`}
      class="transform-center absolute z-50 translate-x-[-50%] translate-y-[-50%] scale-80 rotate-135 animate-spin text-foreground "
    />
  {/if}
</figure>
