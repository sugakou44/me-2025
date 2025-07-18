<script lang="ts">
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { cn } from '@/lib/utils/className'

  import type { Message } from './types'

  const BORDER_RADIUS = 12

  const { byUser, content }: Message = $props()
</script>

<p
  class="relative text-md text-background"
  {@attach squircleBackground({
    cornerRadius: BORDER_RADIUS,
    cornerSmoothing: 1,
    bottomLeftCornerRadius: byUser ? BORDER_RADIUS : 0,
    bottomRightCornerRadius: !byUser ? BORDER_RADIUS : 0,
    class: cn('fill-primary-foreground', {
      'fill-secondary-foreground': byUser,
    }),
  })}
>
  <span class="relative block px-4 py-2">{content}</span>
</p>
