<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'p'">
  import { cn } from '@/lib/utils/className'

  import type { Snippet } from 'svelte'

  interface Props<T extends keyof HTMLElementTagNameMap | Snippet = 'p'> {
    as?: T
    content: string
    class?: string
    charClass?: string
  }

  let {
    as = 'p' as T,
    content,
    class: className,
    charClass,
  }: Props<T> = $props()
</script>

<svelte:element
  this={as}
  class={cn('flex font-mono text-lg font-medium text-white ', className)}
>
  {#each content.split('') as char, index (index)}
    <span
      class={cn('inline-block animate-bounce', charClass)}
      style:animation-delay={`${index * 100}ms`}
    >
      {char}
    </span>
  {/each}
</svelte:element>
