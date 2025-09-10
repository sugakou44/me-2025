<script lang="ts">
  import { annotate } from '@/lib/svelte/annotate.svelte'

  import type { Component } from 'svelte'

  interface Props {
    name: string
    Icon: Component
    isIn?: boolean
  }

  let { Icon, name, isIn }: Props = $props()
</script>

<li>
  <div
    class="h-24 w-24 p-2 md:h-26 md:w-26 md:p-6"
    {@attach annotate({
      visible: isIn,
      color: 'var(--secondary)',
      type: 'box',
      iterations: 4,
      animate: false,
      padding: -2,
    })}
  >
    <div
      class="relative flex h-full flex-col items-center justify-center gap-2 text-primary-foreground"
    >
      <Icon class="min-h-8 min-w-8" />
      <p
        class="text-center !text-sm leading-4 whitespace-pre-line text-inherit"
      >
        {name}
      </p>
    </div>
  </div>
</li>
