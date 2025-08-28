<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { useSuspense, useTexture } from '@threlte/extras'
  import { asset } from '$app/paths'
  import { Color, FrontSide } from 'three'

  import { getTick } from '@/lib/three/frame'
  import { COLORS } from '@/modules/main/constants/colors'

  import {
    BLADE_COUNT,
    BLADE_HEIGHT,
    BLADE_WIDTH,
    PATCH_SIZE,
    STIFFNESS,
  } from './constants'
  import GrassGeometry from './Grass.geometry'
  import fragmentShader from './shaders/fragment.glsl'
  import vertexShader from './shaders/vertex.glsl'

  interface Props {
    segments?: number
    grassCount?: number
    opacity?: number
    position?: ArrayAsVector3
  }

  const {
    segments = 3,
    grassCount = BLADE_COUNT,
    opacity = 0,
    position = [0, 0, 0],
  }: Props = $props()

  const suspend = useSuspense()
  const grassBladeTexturePromise = suspend(
    useTexture(asset('/textures/grass-blade.png')),
  )

  const geometry = new GrassGeometry({
    patchSize: PATCH_SIZE,
    grassCount,
    segments,
  })

  const uniforms = {
    baseColor: {
      value: new Color(0xffffff),
    },
    tipColor: {
      value: COLORS.tertiary,
    },
    tick: {
      value: 0,
    },
    patchSize: {
      value: geometry.patchSize,
    },
    segments: {
      value: geometry.segments,
    },
    vertices: {
      value: geometry.vertices,
    },
    bladeWidth: {
      value: BLADE_WIDTH,
    },
    bladeHeight: {
      value: BLADE_HEIGHT,
    },
    swayFactor: {
      value: STIFFNESS,
    },
    opacity: { value: opacity },
    center: {
      value: position,
    },
    grassBladeTexture: {
      value: null,
    },
  }

  useTask(() => {
    uniforms.tick.value = getTick()
  })
</script>

<!-- eslint-disable-next-line svelte/require-store-reactive-access  -->
{#await grassBladeTexturePromise then grassBladeTexture}
  <T.Mesh {position} count={geometry.instanceCount}>
    <T is={geometry} />
    <T.ShaderMaterial
      transparent
      {vertexShader}
      {fragmentShader}
      {uniforms}
      uniforms.opacity.value={opacity}
      uniforms.center.value={position}
      uniforms.grassBladeTexture.value={grassBladeTexture}
      side={FrontSide}
    />
  </T.Mesh>
{/await}
