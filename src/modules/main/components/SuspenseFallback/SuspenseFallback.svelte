<script lang="ts">
  import { appState } from '@/lib/contexts/AppState'

  $effect(() => {
    return () => {
      appState.isReady = true
    }
  })
</script>
