<script lang="ts" module>
  import type { Props as ComponentProps } from '@threlte/core'
  import type { CanvasTexture, Mesh } from 'three'

  export interface Props extends ComponentProps<Mesh> {
    width: number
    height: number
    imageUrl: string
    color?: string | number
    inverseColor?: boolean
    canvasTexture?: CanvasTexture | null
    opacity?: number
  }
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { useSuspense, useTexture } from '@threlte/extras'
  import { Color } from 'three'

  import { COLOR_VALUES } from '@/modules/main/constants/colors'

  import FragmentShader from './shaders/fragment.glsl'
  import VertexShader from './shaders/vertex.glsl'
  import { createCanvasTexture } from './utils'

  let {
    width,
    height,
    imageUrl,
    color = COLOR_VALUES.primary,
    inverseColor,
    canvasTexture = null,
    opacity = 0,
    ...restProps
  }: Props = $props()

  const _canvasTexture =
    canvasTexture ??
    createCanvasTexture({
      width,
      height,
    })

  const suspend = useSuspense()
  const texturePromise = suspend(useTexture(imageUrl))

  const uniforms = {
    borderTexture: {
      value: _canvasTexture,
    },
    resolution: {
      value: [width, height],
    },
    textureResolution: {
      value: [0, 0],
    },
    backgroundTexture: {
      value: null,
    },
    opacity: {
      value: 0,
    },
    edgeThreshold: {
      value: 0.15,
    },
    diffuse: {
      value: new Color(color),
    },
    inverseColor: {
      value: inverseColor ? 1 : 0,
    },
  }
</script>

<!-- eslint-disable-next-line svelte/require-store-reactive-access  -->
{#await texturePromise then texture}
  <T.Mesh {...restProps}>
    <T.PlaneGeometry args={[width, height, 1, 1]} />
    <T.ShaderMaterial
      transparent
      {uniforms}
      uniforms.opacity.value={opacity}
      uniforms.backgroundTexture.value={texture}
      uniforms.textureResolution.value={[texture.width, texture.height]}
      vertexShader={VertexShader}
      fragmentShader={FragmentShader}
    />
  </T.Mesh>
{/await}
