<script lang="ts">
  import { T } from '@threlte/core'
  import { eases, utils } from 'animejs'
  import { Tween } from 'svelte/motion'
  import { DoubleSide } from 'three'

  import {
    Instance,
    InstancedMesh,
  } from '@/components/GL/InstancedUniformsMesh'
  import { DURATION_SLOW, DURATION_SLOWEST } from '@/lib/animations/constants'
  import { windowState } from '@/lib/contexts/Window'

  import { COLORS, PATTERNS, SHAPES, TOTAL, VARIANTS } from './constants'
  import FragmentShader from './shaders/fragment.glsl'
  import VertexShader from './shaders/vertex.glsl'

  import type { ComponentProps } from 'svelte'

  interface Props extends ComponentProps<typeof T.Group> {
    isIn?: boolean
  }

  let { ref = $bindable(), isIn, ...props }: Props = $props()

  const animationState = new Tween(1)

  $effect.pre(() => {
    if (isIn) {
      animationState.set(1, {
        duration: DURATION_SLOWEST,
        easing: eases.outElastic(1.1, 1),
      })
    } else {
      animationState.set(0, {
        duration: DURATION_SLOW,
        easing: eases.inQuad,
      })
    }
  })

  const aspectRatio = $derived(Math.max(windowState.aspectRatio / 1.6, 0.5))

  let count = TOTAL + 4

  const colors = new Float32Array(count * 4)
  const options = new Float32Array(count * 3)
  const shapeOptions = new Float32Array(count * 2)
  const patternOptions = new Float32Array(count * 3)
  const baseOpacity = new Float32Array(count)

  let i = 0
  let i3 = i * 3
  let i2 = i * 2

  let color = COLORS[0]
  colors[i3 + 0] = color.r
  colors[i3 + 1] = color.g
  colors[i3 + 2] = color.b
  baseOpacity[i] = 1

  options[i3 + 0] = SHAPES.findIndex((item) => item === 'circle')
  options[i3 + 1] = VARIANTS.findIndex((item) => item === 'solid')
  options[i3 + 2] = 0

  shapeOptions[i2 + 0] = 1
  shapeOptions[i2 + 1] = 0

  patternOptions[i3 + 0] = 10
  patternOptions[i3 + 1] = 1
  patternOptions[i3 + 2] = 0

  i = 1
  i3 = i * 3
  i2 = i * 2

  color = COLORS[3]
  colors[i3 + 0] = color.r
  colors[i3 + 1] = color.g
  colors[i3 + 2] = color.b
  baseOpacity[i] = 1

  options[i3 + 0] = SHAPES.findIndex((item) => item === 'triangle')
  options[i3 + 1] = VARIANTS.findIndex((item) => item === 'ghost')
  options[i3 + 2] = PATTERNS.findIndex((item) => item === 'stripe')

  shapeOptions[i2 + 0] = 1
  shapeOptions[i2 + 1] = 0

  patternOptions[i3 + 0] = 10
  patternOptions[i3 + 1] = 1
  patternOptions[i3 + 2] = 0

  i = 2
  i3 = i * 3
  i2 = i * 2

  color = COLORS[2]
  colors[i3 + 0] = color.r
  colors[i3 + 1] = color.g
  colors[i3 + 2] = color.b
  baseOpacity[i] = 1

  options[i3 + 0] = SHAPES.findIndex((item) => item === 'triangle')
  options[i3 + 1] = VARIANTS.findIndex((item) => item === 'outline')
  options[i3 + 2] = PATTERNS.findIndex((item) => item === 'circle')

  shapeOptions[i2 + 0] = 1
  shapeOptions[i2 + 1] = 0

  patternOptions[i3 + 0] = 10
  patternOptions[i3 + 1] = 1
  patternOptions[i3 + 2] = 0

  i = 3
  i3 = i * 3
  i2 = i * 2

  color = COLORS[1]
  colors[i3 + 0] = color.r
  colors[i3 + 1] = color.g
  colors[i3 + 2] = color.b
  baseOpacity[i] = 1

  options[i3 + 0] = SHAPES.findIndex((item) => item === 'rectangle')
  options[i3 + 1] = VARIANTS.findIndex((item) => item === 'outline')
  options[i3 + 2] = 99

  shapeOptions[i2 + 0] = 1
  shapeOptions[i2 + 1] = 0

  patternOptions[i3 + 0] = 10
  patternOptions[i3 + 1] = 1
  patternOptions[i3 + 2] = 0

  for (let i = 4; i < count; i++) {
    const i3 = i * 3
    const i2 = i * 2

    const color = COLORS[utils.random(0, COLORS.length - 1)]
    colors[i3 + 0] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
    baseOpacity[i] = utils.random(0.8, 1, 4)

    options[i3 + 0] = utils.random(0, SHAPES.length - 1)
    options[i3 + 1] = utils.random(0, VARIANTS.length - 1)
    options[i3 + 2] = utils.random(0, PATTERNS.length - 1)

    shapeOptions[i2 + 0] = utils.random(0.8, 1, 4)
    shapeOptions[i2 + 1] = 0

    patternOptions[i3 + 0] = utils.random(8, 15)
    patternOptions[i3 + 1] = 1
    patternOptions[i3 + 2] = utils.random(0, 4) >= 3 ? 1 : 0
  }

  const randomizedTransform = new Array(TOTAL).fill(0).map((_, index) => {
    const isLeft = index < TOTAL / 2
    return {
      position: [
        utils.random(1, 5, 4) * (isLeft ? -1 : 1),
        utils.random(-5, 5, 4),
        utils.random(-2, 1, 4),
      ],
      // position: [0, 0, 0],
      rotation: [
        utils.degToRad(utils.random(-50, 50)),
        utils.degToRad(utils.random(0, 50) * (isLeft ? 1 : -1)),
        utils.degToRad(utils.random(-180, 180)),
      ],
      scale: utils.random(0.5, 1, 4),
    }
  })

  const uniforms = {
    opacity: { value: animationState.current },
  }
</script>

<T.Group bind:ref {...props} frustumCulled={false} dispose={false}>
  <InstancedMesh {count} limit={count}>
    <T.PlaneGeometry args={[1, 1, 1, 1]}>
      <T.InstancedBufferAttribute
        attach="attributes.color"
        {count}
        array={colors}
        itemSize={3}
      />
      <T.InstancedBufferAttribute
        attach="attributes.baseOpacity"
        {count}
        array={baseOpacity}
        itemSize={1}
      />
      <T.InstancedBufferAttribute
        attach="attributes.options"
        {count}
        array={options}
        itemSize={3}
      />
      <T.InstancedBufferAttribute
        attach="attributes.shapeOptions"
        {count}
        array={shapeOptions}
        itemSize={2}
      />
      <T.InstancedBufferAttribute
        attach="attributes.patternOptions"
        {count}
        array={patternOptions}
        itemSize={3}
      />
    </T.PlaneGeometry>
    <T.ShaderMaterial
      side={DoubleSide}
      vertexShader={VertexShader}
      fragmentShader={FragmentShader}
      transparent
      {uniforms}
      uniforms.opacity.value={animationState.current * 0.8}
    />
    <Instance
      scale={3}
      position.x={-5 * aspectRatio}
      position.y={-3}
      position.z={1.5 + 3 * (1 - animationState.current)}
      rotation.x={utils.degToRad(40)}
      rotation.y={utils.degToRad(30)}
    />
    <Instance
      scale={2}
      position.x={-3 * aspectRatio}
      position.y={2}
      position.z={2 + 3 * (1 - animationState.current)}
      rotation.y={utils.degToRad(-10)}
      rotation.z={utils.degToRad(-60)}
    />
    <Instance
      scale={4}
      position.x={4 * aspectRatio}
      position.y={-2}
      position.z={2.5 + 3 * (1 - animationState.current)}
      rotation.x={utils.degToRad(-30)}
      rotation.y={utils.degToRad(-30)}
      rotation.z={utils.degToRad(30)}
    />
    <Instance
      scale={1.5}
      position.x={3 * aspectRatio}
      position.y={1.6}
      position.z={1 + 3 * (1 - animationState.current)}
      rotation.x={utils.degToRad(15)}
      rotation.z={utils.degToRad(-20)}
    />
    {#each randomizedTransform as { position, rotation, ...state }, index (index)}
      <Instance
        position.x={position[0] * aspectRatio}
        position.y={position[1]}
        position.z={position[2] + 3 * (1 - animationState.current)}
        rotation.x={rotation[0]}
        rotation.y={rotation[1]}
        rotation.z={rotation[2]}
        {...state}
      />
    {/each}</InstancedMesh
  >
</T.Group>
