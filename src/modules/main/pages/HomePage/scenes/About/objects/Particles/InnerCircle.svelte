<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { utils } from 'animejs'
  import { DataArrayTexture, DoubleSide } from 'three'

  import Instance from '@/components/GL/InstancedUniformsMesh/Instance.svelte'
  import InstancedMesh from '@/components/GL/InstancedUniformsMesh/InstancedMesh.svelte'
  import { DEFAULT_ALPHA_TEST } from '@/lib/animations/constants'
  import { getTick } from '@/lib/three/frame'
  import { COLORS_AS_ARRAY } from '@/modules/main/constants/colors'

  import FragmentShader from './shaders/particle.fragment.glsl'
  import VertexShader from './shaders/particle.vertex.glsl'

  interface Props {
    textures?: DataArrayTexture
    count?: number
    opacity?: number
  }

  let { textures, count = 0, opacity = 1 }: Props = $props()

  const colors = new Float32Array(count * 3)
  const positions = new Float32Array(count * 3)
  const angle = new Float32Array(count)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const ratio = i / count
    const i3 = i * 3

    const color = COLORS_AS_ARRAY[i % COLORS_AS_ARRAY.length]
    colors[i3 + 0] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    positions[i3 + 0] = Math.cos(ratio * Math.PI * 2) * 1.3
    positions[i3 + 1] = Math.sin(ratio * Math.PI * 2) * 1.3
    positions[i3 + 2] = 0

    angle[i] = Math.random() * Math.PI * 2
    sizes[i] = utils.mapRange(Math.random(), 0, 1, 0.7, 0.9)
  }

  const uniforms = {
    tick: {
      value: 0,
    },
    opacity: {
      value: opacity,
    },
    textures: {
      value: textures,
    },
    textureOffset: {
      value: 0,
    },
    textureCount: {
      value: count,
    },
  }

  useTask(() => {
    uniforms.tick.value = getTick()
  })
</script>

<InstancedMesh {count} limit={count} frustumCulled={false}>
  <T.PlaneGeometry args={[1, 1, 1, 1]}>
    <T.InstancedBufferAttribute
      attach="attributes.instanceColor"
      {count}
      array={colors}
      itemSize={3}
    />
    <T.InstancedBufferAttribute
      attach="attributes.instanceOrigin"
      {count}
      array={positions}
      itemSize={3}
    />
    <T.InstancedBufferAttribute
      attach="attributes.instanceAngle"
      {count}
      array={angle}
      itemSize={1}
    />
    <T.InstancedBufferAttribute
      attach="attributes.instanceSize"
      {count}
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
    uniforms.opacity.value={opacity}
    alphaTest={DEFAULT_ALPHA_TEST}
  />
  {#each { length: count } as _, index (index)}
    <Instance />
  {/each}
</InstancedMesh>
