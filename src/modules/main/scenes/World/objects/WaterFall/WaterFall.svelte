<script lang="ts">
  import { T, useStage, useTask, useThrelte } from '@threlte/core'
  import { utils } from 'animejs'
  import { Color, ShaderMaterial, Vector2 } from 'three'

  import { getTick } from '@/lib/three/frame'

  import { RESOLUTION, SIZE, WATER_FLOW_RATE } from './constants'
  import { HeightMap } from './HeightMap'
  import WaterFragmentShader from './shaders/water.fragment.glsl'
  import WaterVertexShader from './shaders/water.vertex.glsl'

  interface Props {
    size?: number
    resolution?: number
  }

  const { size = SIZE, resolution = RESOLUTION }: Props = $props()

  let materialRef: ShaderMaterial | undefined = $state()
  let targetPosition: ArrayAsVector2 = [0, 0]
  let renderedTimeStamp = 0

  const { renderer, mainStage } = useThrelte()

  const heightMap = new HeightMap({ size, resolution, renderer })

  const uniforms = {
    diffuseColor: {
      value: new Color(0x66ff00),
    },
    tick: {
      value: 0,
    },
    center: {
      value: new Vector2(0.0, 0.0),
    },
    displacementMap: {
      value: null,
    },
  }

  useTask(() => {
    if (!materialRef) {
      return
    }

    materialRef.uniforms.tick.value = getTick()
    materialRef.uniforms.displacementMap.value = heightMap.renderTarget.texture
  })

  const gpgpuStage = useStage('gpgpu', { before: mainStage })

  $effect(() => {
    const interval = setInterval(() => {
      targetPosition = [
        utils.random(-SIZE / 4, SIZE / 4),
        utils.random(-SIZE / 4, SIZE / 4),
      ]
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  useTask(
    () => {
      const now = Date.now()

      // 30fps
      if (now - renderedTimeStamp < WATER_FLOW_RATE) {
        return
      }

      renderedTimeStamp = now

      heightMap.setUniform('objectPos', targetPosition)
      targetPosition = [10000, 10000]

      heightMap.renderer.compute()
    },
    {
      stage: gpgpuStage,
    },
  )
</script>

<T.Mesh>
  <T.PlaneGeometry args={[size, size, resolution, resolution]} />
  <T.ShaderMaterial
    bind:ref={materialRef}
    vertexShader={WaterVertexShader}
    fragmentShader={WaterFragmentShader}
    transparent
    {uniforms}
  />
</T.Mesh>
