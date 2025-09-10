<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { utils } from 'animejs'
  import { DataArrayTexture, DoubleSide } from 'three'

  import Instance from '@/components/GL/InstancedUniformsMesh/Instance.svelte'
  import InstancedMesh from '@/components/GL/InstancedUniformsMesh/InstancedMesh.svelte'
  import { DEFAULT_ALPHA_TEST } from '@/lib/animations/constants'
  import { getTick } from '@/lib/three/frame'
  import { COLORS_AS_ARRAY } from '@/modules/main/constants/colors'

  import FragmentShader from './shaders/particles2.fragment.glsl'
  import VertexShader from './shaders/particles2.vertex.glsl'

  interface Props {
    textures?: DataArrayTexture
    count?: number
    offset?: number
    opacity?: number
  }

  let { textures, offset = 0, count = 0, opacity = 0 }: Props = $props()

  let _count = count * 3

  const colors = new Float32Array(_count * 3)
  const positions = new Float32Array(_count * 3)
  const angle = new Float32Array(_count)
  const sizes = new Float32Array(_count)
  for (let i = 0; i < _count; i++) {
    const i3 = i * 3

    const color = COLORS_AS_ARRAY[utils.random(0, 1)]
    colors[i3 + 0] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    const rad = utils.degToRad(utils.random(0, 180, 4))
    const radius = utils.random(1, 5, 4)
    positions[i3 + 0] = Math.cos(rad) * radius
    positions[i3 + 1] = Math.sin(rad) * radius
    positions[i3 + 2] = utils.random(-3, -1, 4)

    angle[i] = Math.random() * Math.PI * 2
    sizes[i] = utils.mapRange(Math.random(), 0, 1, 0.3, 0.5)
  }

  const uniforms = {
    tick: {
      value: 0,
    },
    opacity: {
      value: opacity,
    },
    map: {
      value: null,
    },
    textures: {
      value: textures,
    },
    textureOffset: {
      value: offset,
    },
    textureCount: {
      value: count,
    },
  }

  useTask(() => {
    uniforms.tick.value = getTick()
  })
</script>

<InstancedMesh count={_count} limit={_count} frustumCulled={false}>
  <T.PlaneGeometry args={[1, 1, 1, 1]}>
    <T.InstancedBufferAttribute
      attach="attributes.instanceColor"
      {_count}
      array={colors}
      itemSize={3}
    />
    <T.InstancedBufferAttribute
      attach="attributes.instanceOrigin"
      {_count}
      array={positions}
      itemSize={3}
    />
    <T.InstancedBufferAttribute
      attach="attributes.instanceAngle"
      {_count}
      array={angle}
      itemSize={1}
    />
    <T.InstancedBufferAttribute
      attach="attributes.instanceSize"
      {_count}
      array={sizes}
      itemSize={1}
    />
  </T.PlaneGeometry>
  <T.ShaderMaterial
    side={DoubleSide}
    vertexShader={VertexShader}
    fragmentShader={FragmentShader}
    transparent
    {uniforms}
    uniforms.opacity.value={opacity * 0.8}
    alphaTest={DEFAULT_ALPHA_TEST}
  />
  {#each { length: _count } as _, index (index)}
    <Instance position={[0, 1, 0]} />
  {/each}
</InstancedMesh>
