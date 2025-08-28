<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'span'">
  import { cn } from '@/lib/utils/className'

  import type { Snippet } from 'svelte'

  interface RevealingTextProps<
    T extends keyof HTMLElementTagNameMap | Snippet = 'span',
  > {
    as?: T
    class?: string
    children: Snippet
    percent?: number
  }

  const {
    as = 'span' as T,
    class: className,
    percent = 0.5,
    children,
  }: RevealingTextProps<T> = $props()
</script>

<svelte:element
  this={as}
  class={cn(
    'revealing-text relative bg-no-repeat text-fill-transparent',
    className,
  )}
  style:--percent={`${percent * 100}%`}
  style:--mix-factor={percent}
>
  {@render children?.()}
</svelte:element>

<style>
  .revealing-text {
    --percent: 0%;
    --mix-factor: 0;
    background-position: 0% 100%;
    background-image: linear-gradient(
      90deg,
      var(--color-primary-foreground) calc(var(--percent) - 4ch),
      transparent calc(var(--percent))
    );
    background-clip: text;
    -webkit-text-fill-color: #0000000f;
    padding-inline-end: 4ch;
  }
</style>
