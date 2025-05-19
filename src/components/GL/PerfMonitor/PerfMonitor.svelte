<script lang="ts">
  import { PerfMonitor as PerfMonitorOri } from '@threlte/extras'

  import type { ComponentProps } from 'svelte'

  type PerfMonitorProps = ComponentProps<typeof PerfMonitorOri>

  const componentProps: Partial<PerfMonitorProps> = $props()
</script>

<PerfMonitorOri anchorX="right" logsPerSecond={10} {...componentProps} />
