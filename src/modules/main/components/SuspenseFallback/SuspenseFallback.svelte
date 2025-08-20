<script lang="ts">
  import { appState } from '@/modules/main/contexts/AppState'

  $effect(() => {
    return () => {
      appState.isReady = true
    }
  })
</script>
