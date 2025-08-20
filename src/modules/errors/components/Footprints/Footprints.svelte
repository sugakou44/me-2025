<script lang="ts">
  import { asset } from '$app/paths'
  import { utils } from 'animejs'
  import { nanoid } from 'nanoid'

  import { centerPointOrigin, normalize } from '@/lib/utils/math'

  import type { Footprint } from './types'

  const LeftPrint = asset('/svgs/shoe-prints-left.svg')
  const RightPrint = asset('/svgs/shoe-prints-right.svg')
  const STEP_LENGTH = 88
  const LEFT_RIGHT_OFFSET = 24
  const WALK_SPEED = 500
  const TIME_BEFORE_DISAPPEAR = 2000

  let footprints = $state.raw<Footprint[]>([])
  let height = $state(0)
  let width = $state(0)

  const boundX = $derived(Math.round(width / 2))
  const boundY = $derived(Math.round(height / 2))

  $effect(() => {
    const interval = setInterval(() => {
      const lastPrint = footprints.at(-1)

      if (!lastPrint) {
        footprints = [
          {
            id: nanoid(),
            angle: 0,
            isLeftSide: false,
            position: [LEFT_RIGHT_OFFSET / 2, boundY],
            timestamp: Date.now(),
            isAtStop: true,
          },
          {
            id: nanoid(),
            angle: 0,
            isLeftSide: true,
            position: [-LEFT_RIGHT_OFFSET / 2, boundY],
            timestamp: Date.now() + 1,
            isAtStop: true,
          },
        ]

        return
      }

      const newPrintAngle = lastPrint.angle + utils.random(-20, 20)

      const angleInRadiant = utils.degToRad(newPrintAngle)
      const perpendicularAngle = angleInRadiant + Math.PI / 2

      const offsetLength = lastPrint.isLeftSide
        ? LEFT_RIGHT_OFFSET
        : -LEFT_RIGHT_OFFSET

      let posX =
        lastPrint.position[0] +
        Math.sin(angleInRadiant) * STEP_LENGTH +
        Math.sin(perpendicularAngle) * offsetLength
      let posY =
        lastPrint.position[1] -
        Math.cos(angleInRadiant) * STEP_LENGTH -
        Math.cos(perpendicularAngle) * offsetLength

      const limitX = boundX
      const limitY = boundY

      if (Math.abs(posX) > limitX) {
        if (posX < 0) {
          posX = limitX
        } else {
          posX = -limitX
        }
      }

      if (Math.abs(posY) > limitY) {
        if (posY < 0) {
          posY = limitY
        } else {
          posY = -limitY
        }
      }

      const newFootprint: Footprint = {
        id: nanoid(),
        angle: newPrintAngle,
        isLeftSide: !lastPrint?.isLeftSide,
        position: [posX, posY],
        timestamp: Date.now(),
      }

      footprints = [
        ...footprints.filter(
          (print) => Date.now() - print.timestamp < TIME_BEFORE_DISAPPEAR,
        ),
        newFootprint,
      ]
    }, WALK_SPEED)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<div
  bind:clientWidth={width}
  bind:clientHeight={height}
  class="absolute bottom-0 h-[200vh] w-full origin-bottom rotate-x-60 perspective-distant"
>
  {#each footprints as print (print.timestamp)}
    {@const angleOffset = print.isLeftSide ? -8 : 8}
    {@const [x, y] = centerPointOrigin(print.position, [boundX, boundY])}
    {@const opacityX = 1 - normalize(Math.abs(print.position[0]), 100, boundX)}
    {@const opacityY = 1 - normalize(Math.abs(print.position[1]), 100, boundY)}
    <img
      alt=""
      src={print.isLeftSide ? LeftPrint : RightPrint}
      class="footprint absolute w-5"
      style:left={`${x}px`}
      style:top={`${y}px`}
      style:transform={`rotate(${print.angle + angleOffset}deg)`}
      style:--opacity={opacityX * opacityY}
    />
  {/each}
</div>

<style>
  .footprint {
    will-change: opacity, left, top;
    animation: footprint 2s linear 1 forwards;
  }
</style>
