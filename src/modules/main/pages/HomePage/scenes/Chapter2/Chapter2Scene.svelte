<script lang="ts">
  import { T } from '@threlte/core'

  import { appState } from '@/modules/main/contexts/AppState'

  import { ConveyorBelt } from './objects/ConveyorBelt'
</script>

<ConveyorBelt />

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight
  castShadow
  position={[10, 10, 10]}
  intensity={1}
  shadow.mapSize.width={512}
  shadow.mapSize.height={512}
  shadow.camera.left={-30}
  shadow.camera.right={30}
  shadow.camera.top={30}
  shadow.camera.bottom={-30}
  shadow.camera.far={100}
  shadow.camera.near={0.01}
/>
