<script lang="ts">
  import { IconLoader2 } from '@tabler/icons-svelte'

  import { cn } from '@/lib/utils/className'

  interface Props {
    class?: string
  }

  const { class: className }: Props = $props()
</script>

<div class="animate-in fade-in">
  <IconLoader2 class={cn('h-4 w-4 animate-spin ', className)} />
</div>
