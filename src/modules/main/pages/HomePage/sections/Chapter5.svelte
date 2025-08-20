<script lang="ts">
  import { fade } from 'svelte/transition'

  import { DURATION_FAST } from '@/lib/animations/constants'
  import { Paragraph } from '@/modules/main/components/Text'
  import { appState } from '@/modules/main/contexts/AppState'
</script>

<section
  class="chapter section"
  style:--page-count={appState.chapter5TotalPage}
  bind:this={appState.chapter5Container}
>
  {#if appState.chapter5Page === 0}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed top-[10vh] left-1/2 -translate-x-1/2 lg:left-1/6 lg:max-w-[min(40vw,600px)] lg:translate-0"
    >
      <Paragraph>
        Joining Magic Box was my first real step into the web world.
        <br />
        At first, I was focused on backend stuff. But what hooked me, though, just
        the logic or the data — they were the little details.
        <br />
        How a button moved, how a page flowed, how small interaction shaped the experience.
      </Paragraph>
    </div>
  {/if}
  {#if appState.chapter5Page === 1}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed bottom-[10vh] left-1/2 -translate-x-1/2 lg:right-1/6 lg:left-[unset] lg:max-w-[min(40vw,600px)] lg:translate-0"
    >
      <Paragraph>
        Curiosity led me deeper into animations, and eventually into 3D. My
        first experiments were clumsy, but they opened a whole new space where
        code and creativity met.
      </Paragraph>
    </div>
  {/if}
  {#if appState.chapter5Page === 2}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page transform-center fixed"
    >
      <Paragraph>
        That’s when I realized: storytelling through motion was the part I love.
      </Paragraph>
    </div>
  {/if}
</section>
