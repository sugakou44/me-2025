<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte'

  import Link from '@/components/Links/Link.svelte'
  import { roughBackground } from '@/lib/svelte/backgroundRough.svelte'
  import { cn } from '@/lib/utils/className'

  import type { Props as LinkProps } from '@/components/Links/Link.svelte'
  import type { Options } from '@/lib/svelte/backgroundRough.svelte'
  import type { Snippet } from 'svelte'

  interface Props extends LinkProps {
    class?: string
    children?: Snippet
    isExternal?: boolean
    backgroundOptions?: Options
  }

  const {
    class: className,
    children,
    isExternal = true,
    backgroundOptions,
    ...restProps
  }: Props = $props()
</script>

<Link
  {isExternal}
  class={cn(
    'inline-flex actionable items-center justify-center gap-2 [&:hover>.icon]:opacity-100 [&>.icon]:opacity-50',
    className,
  )}
  {...restProps}
  {@attach roughBackground({
    shouldAnimate: true,
    class: '-z-10',
    ...backgroundOptions,
  })}
>
  {@render children?.()}
  <IconExternalLink class="icon inline h-4 w-4" />
</Link>
