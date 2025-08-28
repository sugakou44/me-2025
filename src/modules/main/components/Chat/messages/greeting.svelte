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

{#snippet hello()}
  Hey
  <span class=" hand-waving inline-block origin-bottom-right"> 👋 </span>
{/snippet}

{#snippet helloMe()}
  {@render hello()}, Thank you for visiting
{/snippet}

{#snippet gameInvite()}
  Wanna play game with me?
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
  .hand-waving {
    will-change: transform, transform-origin;
    animation-duration: var(--tw-duration, 1s);
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
    animation-name: hand-waving;
  }
</style>
