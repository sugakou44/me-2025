<script lang="ts">
  import { T } from '@threlte/core'

  import { appState } from '@/modules/main/contexts/AppState'

  import { Particles } from './objects/Particles'
</script>

<T.Group position={[0, -0.3, 4.4]} scale={5} rotation={[-Math.PI / 2, 0, 0]}>
  <Particles isIn={appState.chapter3Page === 2} />
</T.Group>
