<script lang="ts">
  import { annotate } from '@/lib/svelte/annotate.svelte'

  import type { Config } from '@/lib/svelte/annotate.svelte'
  import type { Snippet } from 'svelte'

  interface Props extends Partial<Config> {
    class?: string
    children?: Snippet
  }

  const {
    class: className,
    children,
    type = 'underline',
    ...restProps
  }: Props = $props()
</script>

<span
  class={className}
  {@attach annotate({
    visible: true,
    color: 'var(--secondary-foreground)',
    iterations: 2,
    type,
    padding: 2,
    ...restProps,
  })}
>
  {@render children?.()}
</span>
