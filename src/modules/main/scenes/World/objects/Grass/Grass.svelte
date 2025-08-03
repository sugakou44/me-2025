<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Color, FrontSide, ShaderMaterial } from 'three'

  import { getTick } from '@/lib/three/frame'

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
  }

  const {
    segments = 3,
    grassCount = BLADE_COUNT,
    opacity = 0,
  }: Props = $props()

  let materialRef: ShaderMaterial | undefined = $state()

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
      value: new Color(0x91e0ce),
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
  }

  useTask(() => {
    if (!materialRef) {
      return
    }

    materialRef.uniforms.tick.value = getTick()
  })
</script>

<T.Mesh count={geometry.instanceCount}>
  <T is={geometry} />
  <T.ShaderMaterial
    transparent
    bind:ref={materialRef}
    {vertexShader}
    {fragmentShader}
    {uniforms}
    uniforms.opacity.value={opacity}
    side={FrontSide}
  />
</T.Mesh>
