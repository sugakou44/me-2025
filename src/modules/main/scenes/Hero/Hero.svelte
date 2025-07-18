<script lang="ts">
  import { useDeviceType } from '@/lib/svelte/breakpointValues.svelte'

  import { appState, cameraTrack } from '../../contexts/AppState'
  import { Decorators } from './Decorators'

  const deviceType = useDeviceType()

  const decoratorsPosition = $derived.by(() => {
    const position = cameraTrack.cameraInitialPosition

    return [position[0], position[1], 0] as typeof position
  })
</script>

{#if deviceType().isDesktop}
  <Decorators
    isIn={appState.shouldShowHeroDecorator}
    position={decoratorsPosition}
  />
{/if}
