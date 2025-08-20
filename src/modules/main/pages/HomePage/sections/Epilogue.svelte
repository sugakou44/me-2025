<script lang="ts">
  import { fade } from 'svelte/transition'

  import { DURATION_FAST, DURATION_NORMAL } from '@/lib/animations/constants'
  import { cn } from '@/lib/utils/className'
  import { Paragraph } from '@/modules/main/components/Text'
  import { appState } from '@/modules/main/contexts/AppState'

  const SPAN_CLASSNAME =
    'text-[1.25em] opacity-[0.01] transition-opacity duration-200'
</script>

<section
  bind:this={appState.epilogueContainer}
  class="section chapter"
  style:--page-count={appState.epilogueTotalPage}
  style:--page-size="50vh"
>
  {#if appState.isInEpilogue}
    <div
      in:fade={{
        duration: DURATION_NORMAL,
      }}
      out:fade={{
        duration: DURATION_FAST,
      }}
      class="section epilogue-container transform-center fixed flex min-h-screen items-center justify-center"
      style:--scroll-y={appState.creditScrollProgress}
    >
      <Paragraph
        class="w-full font-handwritting-body font-medium text-primary-foreground"
      >
        <span
          class={cn(SPAN_CLASSNAME, {
            'opacity-100': appState.epiloguePage >= 0,
          })}
        >
          You know how some people have these grand career plans from childhood?
        </span>
        <br />
        <br />
        <span
          class={cn(SPAN_CLASSNAME, {
            'opacity-100': appState.epiloguePage >= 1,
          })}
        >
          Yeah, that wasn't me.
        </span>
        <br />
        <br />
        <span
          class={cn(SPAN_CLASSNAME, {
            'opacity-100': appState.epiloguePage >= 2,
          })}
        >
          I kind of stumbled into coding,
          <br />
          and honestly,
          <br />
        </span>
        <span
          class={cn(SPAN_CLASSNAME, {
            'opacity-100': appState.epiloguePage >= 3,
          })}
        >
          I'm pretty happy about how it turned out.
        </span>
      </Paragraph>
    </div>
  {/if}
</section>

<style>
  .epilogue-container {
    --scroll-y: 0;
    transform: translateY(calc(max(var(--scroll-y), 0) * -100vh));
  }
</style>
