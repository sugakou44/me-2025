<script lang="ts">
  import { fade } from 'svelte/transition'

  import { DURATION_FAST } from '@/lib/animations/constants'
  import { Paragraph } from '@/modules/main/components/Text'
  import { appState } from '@/modules/main/contexts/AppState'
</script>

<section
  class="chapter section"
  style:--page-count={appState.chapter4TotalPage}
  bind:this={appState.chapter4Container}
>
  {#if appState.chapter4Page === 0}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed bottom-[10vh] left-1/2 -translate-x-1/2"
    >
      <Paragraph>
        Just like most kids, my childhood was about games, anime, manga, and
        maybe the occasional novel. But when it came to figuring out what
        <br />
        I wanted to do with my life… I had no idea.
      </Paragraph>
    </div>
  {/if}
  {#if appState.chapter4Page === 1}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed bottom-[10vh] left-1/2 -translate-x-1/2"
    >
      <Paragraph>
        So I just followed in my big brother footsteps - studying electrical
        engineer
      </Paragraph>
    </div>
  {/if}
  {#if appState.chapter4Page === 2}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed bottom-[10vh] left-1/2 -translate-x-1/2"
    >
      <Paragraph>
        It turned out I actually enjoyed it.
        <br />
        The subjects were challenging, but solving problems with numbers, logic,
        and a bit of creativity - you know like one of those puzzle games.
      </Paragraph>
    </div>
  {/if}
</section>
