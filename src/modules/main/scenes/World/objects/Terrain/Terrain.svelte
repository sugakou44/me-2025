<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Color, DoubleSide } from 'three'

  import { getTick } from '@/lib/three/frame'

  import fragmentShader from './shaders/terrain.fragment.glsl'
  import vertexShader from './shaders/terrain.vertex.glsl'

  import type { ShaderMaterial } from 'three'

  interface Props {
    opacity?: number
  }

  let { opacity = 0 }: Props = $props()

  let materialRef: ShaderMaterial | undefined = $state()

  const uniforms = {
    tick: {
      value: 0,
    },
    mixFactor: {
      value: 0.9,
    },
    diffuseColor: {
      value: new Color(0xc5a761),
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

<T.Mesh>
  <T.PlaneGeometry args={[16, 16, 16, 16]} />
  <T.ShaderMaterial
    bind:ref={materialRef}
    transparent
    {vertexShader}
    {fragmentShader}
    {uniforms}
    uniforms.opacity.value={opacity}
    side={DoubleSide}
  />
</T.Mesh>
