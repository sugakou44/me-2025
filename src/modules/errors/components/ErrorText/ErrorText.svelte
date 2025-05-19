<script lang="ts">
  import { cn } from '@/lib/utils/className'

  import type { Snippet } from 'svelte'

  const COMMON_CLASSNAME =
    'inset-0 text-[clamp(80px,20vw,240px)] font-bold tracking-widest font-handwritting'

  interface Props {
    children?: Snippet
    class?: string
  }

  const { children, class: className }: Props = $props()
</script>

{#snippet child()}
  {#if children}
    {@render children?.()}
  {:else}
    ERROR
  {/if}
{/snippet}

<div class={cn('relative select-none', className)}>
  <p
    class={cn(COMMON_CLASSNAME, 'glitch-1 absolute text-secondary-foreground')}
  >
    {@render child()}
  </p>
  <p class={cn(COMMON_CLASSNAME, 'glitch-2 absolute text-blue-200')}>
    {@render child()}
  </p>
  <p class={cn(COMMON_CLASSNAME, 'glitch-3 absolute text-primary-foreground')}>
    {@render child()}
  </p>
  <p class={cn(COMMON_CLASSNAME, 'glitch-top absolute')}>
    {@render child()}
  </p>
  <p class={cn(COMMON_CLASSNAME, 'glitch-bottom relative')}>
    {@render child()}
  </p>
</div>

<style>
  .glitch-top {
    will-change: transform;
    animation: glitch-top 2s step-start infinite;
    clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%);
  }

  .glitch-bottom {
    animation: glitch-bottom 2s step-start infinite;
    clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%);
  }

  .glitch-1 {
    will-change: transform;
    animation: glitch-1 2s step-start infinite;
    clip-path: polygon(
      0% 0%,
      0% 100%,
      25% 100%,
      25% 25%,
      75% 25%,
      75% 75%,
      25% 75%,
      25% 100%,
      100% 100%,
      100% 0%
    );
  }

  .glitch-2 {
    will-change: transform;
    animation: glitch-2 1.9s step-start infinite;
    clip-path: polygon(
      10% 25%,
      35% 25%,
      35% 0%,
      65% 0%,
      65% 25%,
      90% 25%,
      90% 50%,
      65% 50%,
      65% 100%,
      35% 100%,
      35% 50%,
      10% 50%
    );
  }

  .glitch-3 {
    will-change: transform;
    animation: glitch-3 1.8s step-start infinite;
    clip-path: polygon(
      10% 25%,
      35% 25%,
      35% 0%,
      65% 0%,
      65% 25%,
      90% 25%,
      90% 50%,
      65% 50%,
      65% 100%,
      35% 100%,
      35% 50%,
      10% 50%
    );
  }

  @keyframes glitch-bottom {
    45% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(4px);
    }
  }

  @keyframes glitch-top {
    50% {
      transform: translateX(0px);
    }
    55% {
      transform: translateX(-4px);
    }
  }

  @keyframes glitch-1 {
    5% {
      transform: translateX(0px);
    }
    10% {
      transform: translateX(2px);
    }
    55% {
      transform: translateX(0px);
    }
    60% {
      transform: translateX(-4px);
    }
  }

  @keyframes glitch-2 {
    25% {
      transform: translateX(0px);
    }
    30% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(0px);
    }
    80% {
      transform: translateX(2px);
    }
  }

  @keyframes glitch-3 {
    45% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(-4px) translateY(-4px);
    }
    95% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(2px) translateY(-2px);
    }
  }
</style>
