<script lang="ts">
  import { cn } from '@/lib/utils/className'

  import LoadingOverlay from '../Spinners/LoadingOverlay.svelte'

  import type { HTMLAnchorAttributes } from 'svelte/elements'

  export interface Props extends HTMLAnchorAttributes {
    isExternal?: boolean
    isLoading?: boolean
    disabled?: boolean
  }

  const {
    children,
    isExternal,
    href,
    isLoading = false,
    disabled,
    class: className,
    ...rest
  }: Props = $props()

  const restProps =
    href && isExternal
      ? {
          ...rest,
          href,
          target: '_blank',
          rel: 'noreferrer',
        }
      : { ...rest, href }
</script>

<a
  data-sveltekit-preload-code="viewport"
  {...restProps}
  class={cn(
    'actionable font-body underline underline-offset-4 transition-opacity duration-75',
    className,
    {
      disabled: disabled || isLoading,
    },
  )}
>
  <LoadingOverlay isLoaded={!isLoading}>
    {@render children?.()}
  </LoadingOverlay>
</a>

<style>
  a.disabled {
    pointer-events: nnone;
  }
</style>
