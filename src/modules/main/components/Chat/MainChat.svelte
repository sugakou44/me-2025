<script lang="ts">
  import { IconMessageChatbotFilled, IconX } from '@tabler/icons-svelte'
  import { fade } from 'svelte/transition'

  import { Button } from '@/components/Buttons'
  import { Chat } from '@/components/Chat'
  import { DURATION_FAST, DURATION_FASTER } from '@/lib/animations/constants'
  import { scaleY } from '@/lib/animations/transition'
  import { appState } from '@/lib/contexts/AppState'

  import { homeState } from '../../contexts/HomeState'
  import { CONTACT_MESSAGES, TECHSTACK_MESSAGES } from './constants'
  import { mainChatContext } from './context.svelte'
  import { messages as greeting } from './messages/greeting.svelte'
</script>

{#if appState.isIntroAnimationEnded}
  <div
    in:fade={{ duration: DURATION_FAST }}
    class="right-8 bottom-8 z-[100] hidden items-center gap-3 md:fixed md:flex"
  >
    {#if appState.isInHero}
      <div in:fade|global={{ duration: DURATION_FAST, delay: DURATION_FAST }}>
        <Button
          size="default"
          variant="primary"
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
          size="default"
          variant="primary"
          aria-label="ask question"
          onclick={() => {
            mainChatContext.isOpen = true
            mainChatContext.askQuestion('tech-stack')
          }}
        >
          {TECHSTACK_MESSAGES[0].content}
        </Button>
      </div>
    {:else if homeState.epilogueScrollProgress > 0}
      <div in:fade={{ duration: DURATION_FAST }}>
        <Button
          size="default"
          variant="primary"
          aria-label="ask question"
          onclick={() => {
            mainChatContext.isOpen = true
            mainChatContext.askQuestion('contact')
          }}
        >
          {CONTACT_MESSAGES[0].content}
        </Button>
      </div>
    {/if}
    <Button
      size="icon"
      variant="primary"
      aria-label="Chat"
      class="xl:h-16 xl:w-16"
      onclick={() => {
        mainChatContext.isOpen = !mainChatContext.isOpen
      }}
    >
      {#if mainChatContext.isOpen}
        <span
          transition:scaleY={{ opacity: 0 }}
          class="absolute inset-0 flex items-center justify-center"
        >
          <IconX class="xl:h-8 xl:w-8 " />
        </span>
      {:else}
        <span
          transition:scaleY={{ opacity: 0 }}
          class="absolute inset-0 flex items-center justify-center"
        >
          <IconMessageChatbotFilled class="xl:h-8 xl:w-8" />
        </span>
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
