<script lang="ts">
  import { appState } from '@/modules/main/contexts/AppState'

  import { Decorators } from './objects/Decorators'
</script>

<Decorators isIn={appState.forceOpenHero} position={[0, 0, 0]} />
