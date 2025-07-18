<script lang="ts">
  import { Button } from 'bits-ui'

  import { cn } from '@/lib/utils/className'

  import LoadingOverlay from '../Spinners/LoadingOverlay.svelte'
  import { buttonVariants } from './constants'

  import type { Props } from './types'

  const {
    variant,
    size,
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

<Button.Root
  {...restProps as Props}
  disabled={disabled || isLoading}
  class={cn(buttonVariants({ variant, size, className: className as string }))}
>
  <LoadingOverlay isLoaded={!isLoading}>
    {@render children?.()}
  </LoadingOverlay>
</Button.Root>
