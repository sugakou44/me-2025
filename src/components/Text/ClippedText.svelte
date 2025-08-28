<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'p'">
  import { cn } from '@/lib/utils/className'

  import type { Snippet } from 'svelte'

  interface ClippedTextProps<
    T extends keyof HTMLElementTagNameMap | Snippet = 'p',
  > {
    as?: T
    class?: string
    clippedClass?: string
    children: Snippet
  }

  const {
    as = 'span' as T,
    class: className,
    clippedClass,
    children,
  }: ClippedTextProps<T> = $props()
</script>

<svelte:element this={as} class={cn('relative', className)}>
  {@render children()}
  <span
    class={cn(
      'pointer-none absolute top-[50%] left-0 translate-y-[-50%] text-primary-foreground select-none',
      clippedClass,
    )}
  >
    {@render children()}
  </span>
</svelte:element>
