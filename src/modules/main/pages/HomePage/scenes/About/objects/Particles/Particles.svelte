<script lang="ts">
  import { T, useStage, useTask, useThrelte } from '@threlte/core'
  import { Tween } from 'svelte/motion'

  import {
    DEFAULT_ALPHA_TEST,
    DURATION_FASTEST,
    DURATION_SLOWER,
  } from '@/lib/animations/constants'
  import { windowState } from '@/lib/contexts/Window'
  import { getTick } from '@/lib/three/frame'
  import { prepareDataTextureArray } from '@/lib/three/textures'

  import { COUNT, SIZE } from './constants'
  import { ParticleGeometry } from './Particle.geometry'
  import { PositionMap } from './PositionMap'
  import FragmentShader from './shaders/particles.fragment.glsl'
  import VertexShader from './shaders/particles.vertex.glsl'

  import type { Props } from '@threlte/core'
  import type { Points, Texture } from 'three'

  interface ParticleProps extends Props<Points> {
    isIn?: boolean
    textures?: Texture[]
    origin?: ArrayAsVector3
  }

  let {
    isIn,
    textures = [],
    origin = [0, 0, 0],
    ...rest
  }: ParticleProps = $props()

  const dataTextureArray = prepareDataTextureArray(textures)
  const geometry = new ParticleGeometry(COUNT, SIZE, textures.length)
  const opacityTween = new Tween(1, { duration: DURATION_FASTEST })
  let hasRenderLastTick = true

  $effect(() => {
    opacityTween.set(isIn ? 1 : 0, {
      duration: isIn ? DURATION_SLOWER : DURATION_FASTEST,
    })
  })

  const uniforms = {
    tick: {
      value: 0,
    },
    size: {
      value: 200.0,
    },
    opacity: {
      value: 0,
    },
    resolution: {
      value: [SIZE, SIZE],
    },
    positionMap: {
      value: null as unknown as Texture,
    },
    count: {
      value: COUNT,
    },
    textures: {
      value: dataTextureArray,
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
    if (opacityTween.current === 0) {
      return
    }

    geometry.setDrawRange(0, Math.round(opacityTween.current * COUNT))

    uniforms.tick.value = getTick()
    uniforms.positionMap.value = positionMap.renderTarget.texture
  })

  useTask(
    (dt) => {
      if (opacityTween.current === 0) {
        if (hasRenderLastTick) {
          return
        }

        hasRenderLastTick = true
      } else {
        hasRenderLastTick = false
      }

      const tick = getTick()

      positionMap.setUniform('dt', dt * 0.1)
      positionMap.setUniform('tick', tick)
      positionMap.setUniform('enabled', opacityTween.current)
      positionMap.setUniform('origin', origin)
      positionMap.setUniform('expandFactor', windowState.aspectRatio)

      positionMap.renderer.compute()
    },
    {
      stage: gpgpuStage,
    },
  )
</script>

<T.Points
  {geometry}
  frustumCulled={false}
  visible={opacityTween.current >= DEFAULT_ALPHA_TEST}
  {...rest}
>
  <T.ShaderMaterial
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
