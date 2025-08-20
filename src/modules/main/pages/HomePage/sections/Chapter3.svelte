<script lang="ts">
  import { fade } from 'svelte/transition'

  import { DURATION_FAST } from '@/lib/animations/constants'
  import {
    HighlightText,
    Paragraph,
    Subtext,
  } from '@/modules/main/components/Text'
  import { appState } from '@/modules/main/contexts/AppState'
</script>

<section
  class="chapter section"
  style:--page-count={appState.chapter3TotalPage}
  bind:this={appState.chapter3Container}
>
  {#if appState.chapter3Page === 0}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed top-[10vh] left-1/2 -translate-x-1/2 lg:left-1/6 lg:max-w-[min(40vw,600px)] lg:translate-0"
    >
      <Paragraph>
        Joining Magic Box was my first real step into the web world.
        <br />
        This is where I experience building server for application using

        <HighlightText>Express.js</HighlightText>
        ,databases and
        <HighlightText>Echo</HighlightText>
        <Subtext class="text-[0.5em] opacity-60">(Golang)</Subtext>
        for some small projects.
      </Paragraph>
    </div>
  {/if}
  {#if appState.chapter3Page === 1}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed bottom-[10vh] left-1/2 -translate-x-1/2 lg:right-1/6 lg:left-[unset] lg:max-w-[min(40vw,600px)] lg:translate-0"
    >
      <Paragraph>
        But what hooked me, though, not just the logic or the data — they were
        the little details.
        <br />
        How a button moved, how a page flowed, how small interaction shaped the experience.
      </Paragraph>
    </div>
  {/if}
  {#if appState.chapter3Page === 2}
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
