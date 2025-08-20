<script lang="ts">
  import { T } from '@threlte/core'

  import { Map } from './objects/Map'
</script>

<Map />

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight
  castShadow
  position={[10, 10, 10]}
  intensity={1}
  shadow.mapSize.width={512}
  shadow.mapSize.height={512}
  shadow.camera.left={-10}
  shadow.camera.right={10}
  shadow.camera.top={10}
  shadow.camera.bottom={-10}
/>

<T.Group position={[0, 0, 0]}>
  <T.Mesh receiveShadow>
    <T.PlaneGeometry args={[10, 10]} />
    <T.ShadowMaterial opacity={0.5} color="black" />
  </T.Mesh>
</T.Group>
