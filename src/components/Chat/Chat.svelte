<script lang="ts">
  import { eases } from 'animejs'
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'

  import { DURATION_FAST, DURATION_SLOW } from '@/lib/animations/constants'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { cn } from '@/lib/utils/className'

  import BouncingText from '../Text/BouncingText.svelte'
  import Bubble from './Bubble.svelte'

  import type { ChatProps } from './types'

  const { messages, isLoading }: ChatProps = $props()
</script>

<div
  class="container"
  {@attach squircleBackground({
    cornerRadius: 24,
    cornerSmoothing: 1,
    class: 'fill-white h-full [&_path]:border-4 [&_path]:border-red-500 ',
  })}
>
  <div
    class="container flex !h-[550px] !w-[400px] flex-col-reverse overflow-x-hidden overflow-y-auto p-6"
  >
    <div
      class={cn('flex justify-center opacity-0 transition-opacity', {
        'opacity-100': isLoading,
      })}
    >
      <BouncingText content="..." class="pt-4 text-secondary-foreground" />
    </div>
    {#each messages as message (message.id)}
      <div
        in:fade={{
          delay: DURATION_FAST,
          duration: DURATION_SLOW * 2,
          easing: eases.outElastic(1.05, 0.8),
        }}
        animate:flip={{
          duration: DURATION_FAST,
          easing: eases.inOutSine,
        }}
        class={cn('relative mr-4 origin-bottom-left self-start pt-2', {
          'mr-0 ml-4 origin-bottom-right self-end': message.byUser,
        })}
      >
        <Bubble {...message} />
      </div>
    {/each}
  </div>
</div>

<style>
  .container :global(li) {
    list-style-type: 'ー ';
    list-style-position: inside;
  }
</style>
