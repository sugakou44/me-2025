<script lang="ts">
  import { useDeviceType } from '@/lib/svelte/breakpointValues.svelte'

  import { appState } from '../../contexts/AppState'
  import { Decorators } from './Decorators'

  const deviceType = useDeviceType()
</script>

{#if deviceType().isDesktop}
  <Decorators isIn={appState.shouldShowHeroDecorator} position={[0, 0, 0]} />
{/if}
