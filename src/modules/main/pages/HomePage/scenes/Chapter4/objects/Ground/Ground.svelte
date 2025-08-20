<script lang="ts">
  import { T } from '@threlte/core'
  import { Collider } from '@threlte/rapier'

  const SIZE = 40
</script>

<T.Group position={[0, 0, -1]}>
  <Collider shape="cuboid" args={[SIZE, SIZE, 0.1]}>
    <T.Mesh>
      <T.BoxGeometry args={[SIZE * 2, SIZE * 2, 0.1 * 2]} />
      <T.MeshStandardMaterial
        color="white"
        emissive={0xffffff}
        emissiveIntensity={10}
      />
    </T.Mesh>
  </Collider>
</T.Group>
