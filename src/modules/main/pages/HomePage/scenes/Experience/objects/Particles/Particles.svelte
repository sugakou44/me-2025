<script lang="ts">
  import { T, useStage, useTask, useThrelte } from '@threlte/core'
  import { Tween } from 'svelte/motion'

  import {
    DEFAULT_ALPHA_TEST,
    DURATION_SLOWER,
  } from '@/lib/animations/constants'
  import { getTick } from '@/lib/three/frame'

  import { COUNT, SIZE } from './constants'
  import { ParticleGeometry } from './Particle.geometry'
  import { PositionMap } from './PositionMap'
  import FragmentShader from './shaders/particles.fragment.glsl'
  import VertexShader from './shaders/particles.vertex.glsl'

  import type { ShaderMaterial } from 'three'

  interface Props {
    isIn?: boolean
    position?: ArrayAsVector3
  }

  let { isIn, position = [0, 0, 0] }: Props = $props()

  let materialRef: ShaderMaterial

  const geometry = new ParticleGeometry(COUNT, SIZE)
  const opacityTween = new Tween(1, { duration: DURATION_SLOWER })
  let hasRenderLastTick = true

  $effect(() => {
    opacityTween.set(isIn ? 1 : 0)
  })

  const uniforms = {
    tick: {
      value: 0,
    },
    size: {
      value: 220.0,
    },
    opacity: {
      value: 0,
    },
    resolution: {
      value: [SIZE, SIZE],
    },
    positionMap: {
      value: null,
    },
    count: {
      value: COUNT,
    },
  }

  const { renderer } = useThrelte()

  const positionMap = new PositionMap({
    size: SIZE,
    resolution: SIZE,
    renderer,
  })

  const gpgpuStage = useStage('gpgpu')

  useTask(() => {
    if (!materialRef || opacityTween.current === 0) {
      return
    }

    geometry.setDrawRange(0, Math.round(opacityTween.current * COUNT))

    materialRef.uniforms.tick.value = getTick()
    materialRef.uniforms.positionMap.value = positionMap.renderTarget.texture
  })

  useTask(
    (dt) => {
      const tick = getTick()

      if (opacityTween.current === 0) {
        if (hasRenderLastTick) {
          return
        }

        hasRenderLastTick = true
      } else {
        hasRenderLastTick = false
      }

      positionMap.setUniform('dt', dt * 0.1)
      positionMap.setUniform('tick', tick)
      positionMap.setUniform('enabled', opacityTween.current)
      positionMap.setUniform('origin', position)

      positionMap.renderer.compute()
    },
    {
      stage: gpgpuStage,
    },
  )
</script>

<T.Points {geometry} frustumCulled={false}>
  <T.ShaderMaterial
    bind:ref={materialRef}
    {uniforms}
    uniforms.opacity.value={opacityTween.current}
    vertexShader={VertexShader}
    fragmentShader={FragmentShader}
    transparent
    alphaTest={DEFAULT_ALPHA_TEST}
  />
  <!-- <T.PointsMaterial
    size={0.06}
    color="#ff6600"
    opacity={0.5}
    bleding={AdditiveBlending}
    transparent
  /> -->
</T.Points>
