<script lang="ts">
  import { PerfMonitor as PerfMonitorOri } from '@threlte/extras'

  import { IS_DEV } from '@/lib/constants'

  import type { ComponentProps } from 'svelte'

  type PerfMonitorProps = ComponentProps<typeof PerfMonitorOri>

  const componentProps: Partial<PerfMonitorProps> = $props()
</script>

{#if IS_DEV}
  <PerfMonitorOri anchorX="right" logsPerSecond={10} {...componentProps} />
{/if}
