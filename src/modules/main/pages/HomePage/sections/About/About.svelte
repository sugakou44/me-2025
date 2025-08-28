<script lang="ts">
  import { eases } from 'animejs'
  import { fade } from 'svelte/transition'

  import { DURATION_FAST } from '@/lib/animations/constants'
  import { HighlightText, Paragraph } from '@/modules/main/components/Text'
  import { homeState } from '@/modules/main/contexts/HomeState'
</script>

<section
  class="chapter section lg:!max-w-[unset]"
  style:--page-size="140vh"
  bind:this={homeState.aboutContainer}
>
  {#if homeState.aboutVisibility}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed top-[unset] bottom-8 left-1/2 max-w-xl -translate-x-1/2 -translate-y-1/2 will-change-transform xl:left-1/4"
      style:transform={`translateY(${100 * (1 - eases.outSine(homeState.aboutScrollProgress)) * 1.25}%)`}
    >
      <Paragraph class="text-primary-foreground">
        Hello again
        <br />
        I'm frontend developer with 5 years of experience.
        <br />
        <br />
        I mostly working with
        <HighlightText>Next.js</HighlightText>, with recent interested in
        <HighlightText>Svelte</HighlightText>
      </Paragraph>
      <!-- <BouncingText
        charClass="animate-"
        class="text-black"
        content="I'm frontend developer"
      /> -->
    </div>
  {/if}
</section>
