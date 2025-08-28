<script lang="ts">
  import { T } from '@threlte/core'
  import { eases, utils } from 'animejs'
  import { Tween } from 'svelte/motion'

  import { DURATION_SLOW, DURATION_SLOWEST } from '@/lib/animations/constants'
  import { useAspectRatio } from '@/lib/svelte/aspectRatio.svelte'

  import { COLORS, PATTERNS, SHAPES, TOTAL, VARIANTS } from './constants'
  import Decorator from './Decorator.svelte'

  import type { ComponentProps } from 'svelte'
  import type { Indice } from './constants'

  interface Props extends ComponentProps<typeof T.Group> {
    isIn?: boolean
  }

  let { ref = $bindable(), isIn, ...props }: Props = $props()

  const animationState = new Tween({ z: 2, opacity: 0 })

  $effect(() => {
    if (isIn) {
      animationState.set(
        { z: 0, opacity: 1 },
        {
          duration: DURATION_SLOWEST,
          easing: eases.outElastic(1.1, 1),
        },
      )
    } else {
      animationState.set(
        { z: 3, opacity: 0 },
        {
          duration: DURATION_SLOW,
          easing: eases.inQuad,
        },
      )
    }
  })

  const getAspectRatio = useAspectRatio()
  const aspectRatio = $derived(Math.max(getAspectRatio() / 1.6, 0.5))

  const { defaultStates, shaderIndice } = $derived.by(() => {
    const centerShaderIndice = new Array(TOTAL).fill(0).map(() => {
      return {
        shape: SHAPES[utils.random(0, SHAPES.length - 1)],
        variant: VARIANTS[utils.random(0, VARIANTS.length - 1)],
        pattern: PATTERNS[utils.random(0, PATTERNS.length - 1)],
        shapeRaio: utils.random(0.8, 1, 4),
        patternCount: utils.random(8, 15),
        negative: utils.random(0, 4) >= 3,
        idleMovementItensity: utils.random(0, 100) / 10000,
      } as Indice
    })

    const centerDefaultStates = centerShaderIndice.map((_, index) => {
      const isLeft = index < centerShaderIndice.length / 2
      return {
        position: [
          utils.random(1, 5, 4) * (isLeft ? -1 : 1),
          utils.random(-5, 5, 4),
          utils.random(-2, 1, 4),
        ] as ArrayAsVector3,
        rotation: [
          utils.degToRad(utils.random(-50, 50)),
          utils.degToRad(utils.random(0, 50) * (isLeft ? 1 : -1)),
          utils.degToRad(utils.random(-180, 180)),
        ] as ArrayAsVector3,
        scale: utils.random(0.5, 1, 4),
        color: COLORS[utils.random(0, COLORS.length - 1)],
        opacity: utils.random(0.8, 1, 4),
      }
    })

    return {
      defaultStates: centerDefaultStates,
      shaderIndice: centerShaderIndice,
    }
  })
</script>

<T.Group bind:ref {...props}>
  <Decorator
    scale={3}
    position={[-5 * aspectRatio, -3, 1.5 + animationState.current.z]}
    rotation={[utils.degToRad(40), utils.degToRad(30), 0]}
    variant="solid"
    shape="circle"
    color={COLORS[0].getHex()}
    opacity={0.8 * animationState.current.opacity}
  />
  <Decorator
    scale={2}
    position={[-3 * aspectRatio, 2, 2 + animationState.current.z]}
    variant="ghost"
    shape="triangle"
    pattern="stripe"
    color={COLORS[3].getHex()}
    shapeRatio={1}
    rotation={[0, utils.degToRad(-10), utils.degToRad(-60)]}
    opacity={0.8 * animationState.current.opacity}
  />
  <Decorator
    scale={4}
    rotation={[utils.degToRad(-30), utils.degToRad(-30), utils.degToRad(30)]}
    position={[4 * aspectRatio, -2, 2.5 + animationState.current.z]}
    opacity={0.8 * animationState.current.opacity}
    variant="outline"
    shape="triangle"
    pattern="circle"
    color={COLORS[2].getHex()}
  />
  <Decorator
    scale={1.5}
    rotation={[utils.degToRad(15), utils.degToRad(0), utils.degToRad(-20)]}
    position={[3 * aspectRatio, 1.6, 1 + animationState.current.z]}
    opacity={0.8 * animationState.current.opacity}
    variant="outline"
    shape="rectangle"
    pattern={null}
    color={COLORS[1].getHex()}
  />
  {#each defaultStates as { position, opacity, ...state }, index (index)}
    <Decorator
      position={[
        position[0] * aspectRatio,
        position[1],
        position[2] + animationState.current.z,
      ] as ArrayAsVector3}
      opacity={opacity * animationState.current.opacity * 0.8}
      {...state}
      {...shaderIndice[index]}
    />
  {/each}
</T.Group>
