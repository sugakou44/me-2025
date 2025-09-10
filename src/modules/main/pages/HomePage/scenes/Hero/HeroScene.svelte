<script lang="ts">
  import { appState } from '@/lib/contexts/AppState'

  import { Decorators } from './objects/Decorators'
</script>

<Decorators isIn={appState.forceOpenHero} />
