<script lang="ts">
  import { T } from '@threlte/core'
  import { Color, DoubleSide } from 'three'

  import { DEFAULT_ALPHA_TEST } from '@/lib/animations/constants'
  import vertexShader from '@/lib/shaders/base.vertex.glsl'

  import fragmentShader from './shaders/base.fragment.glsl'

  import type { Props } from './types'

  let {
    ref = $bindable(),
    color = '#ff6600',
    opacity = 0.8,
    width = 1,
    height = 1,
    borderWidth = 0,
    variant = 'outline',
    shape: shapeProp = 'triangle',
    patternCount = 10,
    patternScaleRatio = 1,
    shapeRatio = 1.0,
    pattern: patternProp = null,
    negative = false,
    // idleMovementItensity = 0,
    // isIn = true,
    ...props
  }: Props = $props()

  const uniforms = {
    color: { value: new Color(color) },
    opacity: { value: opacity },
    shapeRatio: {
      value: shapeRatio,
    },
    borderWidth: {
      value: borderWidth,
    },
    patternCount: {
      value: patternCount,
    },
    patternScaleRatio: {
      value: patternScaleRatio,
    },
    patternOffset: {
      value: negative ? 1 : 0,
    },
  }

  const defines = {
    [`PATTERN_${patternProp?.toUpperCase()}`]: 1,
    [`SHAPE_${shapeProp.toUpperCase()}`]: 1,
    [`VARIANT_${variant.toUpperCase()}`]: 1,
  }
</script>

<T.Group bind:ref {...props}>
  <T.Mesh>
    <T.PlaneGeometry args={[width, height, 1, 1]} />
    <T.ShaderMaterial
      transparent
      side={DoubleSide}
      uniformsNeedUpdate={true}
      {defines}
      {vertexShader}
      {fragmentShader}
      {uniforms}
      uniforms.opacity.value={opacity}
      alphaTest={DEFAULT_ALPHA_TEST}
    />
  </T.Mesh>
</T.Group>
