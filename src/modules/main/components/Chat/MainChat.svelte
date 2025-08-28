<script lang="ts">
  import { IconMessageChatbotFilled, IconX } from '@tabler/icons-svelte'
  import { fade } from 'svelte/transition'

  import { Button } from '@/components/Buttons'
  import { Chat } from '@/components/Chat'
  import { DURATION_FAST, DURATION_FASTER } from '@/lib/animations/constants'
  import { appState } from '@/lib/contexts/AppState'

  import { homeState } from '../../contexts/HomeState'
  import { EXPERIENCE_MESSAGES, TECHSTACK_MESSAGES } from './constants'
  import { mainChatContext } from './context.svelte'
  import { messages as greeting } from './messages/greeting.svelte'
</script>

{#if appState.isIntroAnimationEnded}
  <div
    in:fade={{ duration: DURATION_FAST }}
    class="right-8 bottom-8 z-[100] hidden gap-4 md:fixed md:flex"
  >
    {#if appState.isInHero}
      <div in:fade|global={{ duration: DURATION_FAST, delay: DURATION_FAST }}>
        <Button
          size="lg"
          variant="secondary"
          aria-label="ask question"
          onclick={() => {
            mainChatContext.isOpen = true
            mainChatContext.askQuestion('hello')
          }}
        >
          {@render greeting.hello()}
        </Button>
      </div>
    {:else if homeState.aboutVisibility}
      <div in:fade={{ duration: DURATION_FAST }}>
        <Button
          size="lg"
          variant="secondary"
          aria-label="ask question"
          onclick={() => {
            mainChatContext.isOpen = true
            mainChatContext.askQuestion('tech-stack')
          }}
        >
          {TECHSTACK_MESSAGES[0].content}
        </Button>
      </div>
    {:else if homeState.experienceVisibility}
      <div in:fade={{ duration: DURATION_FAST }}>
        <Button
          size="lg"
          variant="secondary"
          aria-label="ask question"
          onclick={() => {
            mainChatContext.isOpen = true
            mainChatContext.askQuestion('experience')
          }}
        >
          {EXPERIENCE_MESSAGES[0].content}
        </Button>
      </div>
    {/if}
    <Button
      size="icon"
      variant="secondary"
      aria-label="Chat"
      onclick={() => {
        mainChatContext.isOpen = !mainChatContext.isOpen
      }}
    >
      {#if mainChatContext.isOpen}
        <IconX class="h-8 w-8" />
      {:else}
        <IconMessageChatbotFilled class="h-8 w-8" />
      {/if}
    </Button>
  </div>
{/if}

{#if mainChatContext.isOpen}
  <div
    transition:fade={{ duration: DURATION_FASTER }}
    class="fixed right-8 bottom-28 z-[100] hidden rounded-4xl shadow-xl md:block"
    onwheel={(event) => {
      event.stopPropagation()
    }}
    onscrollcapture={(event) => {
      event.stopPropagation()
    }}
  >
    <Chat
      messages={mainChatContext.messages}
      isLoading={!!mainChatContext.timer}
    />
  </div>
{/if}
