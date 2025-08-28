<script lang="ts">
  import {
    IconArrowLeft,
    IconChevronLeft,
    IconHomeFilled,
  } from '@tabler/icons-svelte'
  import { page } from '$app/state'

  import { ROUTES } from '@/lib/constants/routes'
  import { windowState } from '@/lib/contexts/Window'
  import { cn } from '@/lib/utils/className'

  import { Button } from '../Buttons'

  import type { Props } from '../Buttons'

  const canGoBack = $derived(!!windowState.previousPathname)

  const {
    class: className,
    iconClass,
    ...rest
  }: Props & {
    iconClass?: string
  } = $props()
</script>

<Button
  variant="ghost"
  class={cn('back-button', className)}
  href={canGoBack ? undefined : ROUTES.home.pathname}
  aria-label={canGoBack ? 'Back' : 'Home'}
  onclick={() => {
    if (canGoBack) {
      history.back()
    }
  }}
  {...rest}
>
  <IconArrowLeft
    class={cn(
      'icon-left stroke-current stroke-3 transition-all duration-150',
      iconClass,
    )}
  />
  <span class="mx-4 transition-all duration-150">
    {canGoBack ? 'Back' : 'Home'}
  </span>
  {#if canGoBack}
    <IconChevronLeft
      class={cn(
        'icon-right absolute right-0 translate-x-1/2 stroke-current stroke-3 transition-all duration-150',
        iconClass,
      )}
    />
  {:else if page.url.pathname !== ROUTES.home.pathname}
    <IconHomeFilled
      class={cn(
        'icon-right absolute right-0 translate-x-1/2 transition-all duration-150',
        iconClass,
      )}
    />
  {/if}
</Button>

<style>
  :global(.back-button) > :global(.icon-left) {
    transition-delay: 0.1s;
    opacity: 1;
  }
  :global(.back-button) > :global(.icon-right) {
    transition-delay: 0.1s;
    opacity: 0;
  }

  :global(.back-button) > span {
    transition-delay: 0.12s;
  }

  :global(.back-button):hover > span {
    transform: translate3d(-24px, 0, 0);
  }

  :global(.back-button):hover > :global(.icon-left) {
    transform: translate3d(-28px, 0, 0);
    /*transition-delay: 0.1s;*/
    opacity: 0;
  }

  :global(.back-button):hover > :global(.icon-right) {
    transform: translate3d(-32px, 0, 0);
    /*transition-delay: 0.3s;*/
    opacity: 1;
  }

  :global(.back-button-footer):hover > span {
    transform: translate3d(-32px, 0, 0);
  }

  :global(.back-button-footer):hover > :global(.icon-left) {
    transform: translate3d(-32px, 0, 0);
  }

  :global(.back-button-footer):hover > :global(.icon-right) {
    transform: translate3d(-56px, 0, 0);
  }
</style>
