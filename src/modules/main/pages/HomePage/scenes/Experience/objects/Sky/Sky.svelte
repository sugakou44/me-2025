<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { useSuspense, useTexture } from '@threlte/extras'
  import { asset } from '$app/paths'

  import { getTick } from '@/lib/three/frame'

  import FragmentShader from './shaders/fragment.glsl'
  import VertexShader from './shaders/vertex.glsl'

  import type { Props as ComponentProps } from '@threlte/core'
  import type { Mesh } from 'three'

  const suspend = useSuspense()
  const skyTexturePromise = suspend(
    useTexture(asset('/images/textures/sky-2.jpg')),
  )
  const fadeTexturePromise = suspend(
    useTexture(asset('/images/textures/fade-textures/fade_15.jpeg')),
  )

  interface Props extends ComponentProps<Mesh> {
    opacity?: number
  }

  let { opacity, ...rest }: Props = $props()

  const uniforms = {
    skyTexture: {
      value: null,
    },
    fadeTexture: {
      value: null,
    },
    opacity: {
      value: opacity,
    },
    tick: {
      value: 0,
    },
  }

  useTask(() => {
    const tick = getTick()

    uniforms.tick.value = tick
  })
</script>

<!-- eslint-disable-next-line svelte/require-store-reactive-access  -->
{#await Promise.all( [skyTexturePromise, fadeTexturePromise], ) then [skyTexture, fadeTexture]}
  <T.Mesh {...rest}>
    <T.PlaneGeometry args={[2, 1.3, 1, 1]} />
    <T.ShaderMaterial
      transparent
      vertexShader={VertexShader}
      fragmentShader={FragmentShader}
      {uniforms}
      uniforms.opacity.value={opacity}
      uniforms.skyTexture.value={skyTexture}
      uniforms.fadeTexture.value={fadeTexture}
    />
  </T.Mesh>
{/await}
