<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { utils } from 'animejs'
  import { Color, Vector2 } from 'three'

  import { windowState } from '@/lib/contexts/Window'
  import { getTick } from '@/lib/three/frame'

  import PlaneFragmentShader from './shaders/wobblyPlane.fragment.glsl'
  import PlaneVertexShader from './shaders/wobblyPlane.vertex.glsl'

  interface Props {
    size: number
    position?: ArrayAsVector3
    rotationRad?: number
  }

  let {
    size,
    position = [0, 0, 0],
    rotationRad = utils.degToRad(45),
  }: Props = $props()

  const scaleX = $derived(Math.max(windowState.aspectRatio / 1.4, 1.2))

  const planeUniform = {
    diffuse: {
      value: new Color(0xffffff),
    },
    opacity: {
      value: 1,
    },
    tick: {
      value: 0,
    },
    edgeRatio: {
      value: 0.95,
    },
    origin: {
      value: new Vector2(1, 1),
    },
  }

  useTask(() => {
    planeUniform.tick.value = getTick()
  })
</script>

<T.Group scale={[scaleX, 1, 1]} {position}>
  <T.Mesh scale={[size, size, 1]} rotation={[0, 0, rotationRad]}>
    <T.PlaneGeometry args={[1, 1, 1, 1]} />
    <T.ShaderMaterial
      transparent
      vertexShader={PlaneVertexShader}
      fragmentShader={PlaneFragmentShader}
      uniforms={planeUniform}
    />
  </T.Mesh>
</T.Group>
