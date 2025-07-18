<script lang="ts">
  import { cn } from '@/lib/utils/className'

  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
    class?: string
  }

  const { children, class: className }: Props = $props()
</script>

<p
  class={cn(
    'non-printable fixed bottom-0 left-[50%] max-w-full translate-x-[-50%] rounded-t-md px-2 py-1 text-center font-mono text-xs whitespace-nowrap text-zinc-900/70 select-none hover:bg-white',
    className,
  )}
>
  {@render children()}
</p>
