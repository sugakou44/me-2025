<script lang="ts">
  import { T } from '@threlte/core'
  import { ImageMaterial } from '@threlte/extras'
  import { asset } from '$app/paths'

  import Car from './Car.svelte'

  // const texture = useTexture('texture.png')
</script>

<Car />

<T.Mesh position={[0, 0, -0.01]}>
  <T.PlaneGeometry args={[10, 10]} />
  <ImageMaterial
    transparent
    url={asset('/textures/chapter5/map-texture.jpg')}
    hue={0.5}
    brightness={0.2}
    contrast={1}
  />
</T.Mesh>
