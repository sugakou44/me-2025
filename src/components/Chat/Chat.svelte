<script lang="ts">
  import { eases } from 'animejs'
  import { flip } from 'svelte/animate'
  import { scale } from 'svelte/transition'

  import { DURATION_FAST, DURATION_SLOW } from '@/lib/animations/constants'
  import { cn } from '@/lib/utils/className'

  import Bubble from './Bubble.svelte'

  import type { ChatProps, Message } from './types'

  const DEFAULT_INTERVAL = 1444

  let tmpIndex = $state(0)
  let currentMessages = $state<Message[]>([])

  const { messages, delay = DEFAULT_INTERVAL }: ChatProps = $props()

  $effect(() => {
    if (tmpIndex >= messages.length) {
      return
    }

    const interval = setTimeout(() => {
      if (tmpIndex >= messages.length) {
        return
      }

      currentMessages.unshift(messages[tmpIndex])
      tmpIndex += 1
    }, delay)

    return () => {
      clearTimeout(interval)
    }
  })
</script>

<div
  class="container flex aspect-iphone-15pro !w-[400px] flex-col-reverse overflow-x-hidden overflow-y-auto p-10"
>
  {#each currentMessages as message (message.id)}
    <div
      in:scale={{
        duration: DURATION_SLOW,
        easing: eases.outElastic(1.05, 0.8),
      }}
      animate:flip={{
        duration: DURATION_FAST,
        easing: eases.inOutSine,
      }}
      class={cn('relative origin-bottom-left self-start pt-2', {
        'origin-bottom-right self-end': message.byUser,
      })}
    >
      <Bubble {...message} />
    </div>
  {/each}
</div>
