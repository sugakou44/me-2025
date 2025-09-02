<script lang="ts" module>
  import { IconBombFilled } from '@tabler/icons-svelte'

  import { Button } from '@/components/Buttons'
  import { appState } from '@/lib/contexts/AppState'

  export const messages = {
    hello,
    helloMe,
    gameInvite,
  }
</script>

{#snippet handwaving()}
  <span class="hand-waving inline-block origin-bottom-right"> 👋 </span>
{/snippet}

{#snippet hello()}
  Hey {@render handwaving()}
{/snippet}

{#snippet helloMe()}
  Hi {@render handwaving()}
{/snippet}

{#snippet gameInvite()}
  Want to spend more time here and not be bored by all the reading?
  <br />
  <Button
    size="sm"
    class="mt-2 hidden md:inline-flex"
    onclick={() => {
      appState.isOpenCookiesweeper = true
    }}
  >
    Start&nbsp;<IconBombFilled />
  </Button>
  <span class="inline md:hidden">
    ar... Can you open this with your desktop?
  </span>
{/snippet}

<style>
  :global(.hand-waving) {
    will-change: transform, transform-origin;
    animation-duration: var(--tw-duration, 1s);
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    animation-name: handwaving;
  }
</style>
