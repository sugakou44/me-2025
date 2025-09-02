<script lang="ts">
  import { utils } from 'animejs'
  import { fade } from 'svelte/transition'

  import RevealingText from '@/components/Text/RevealingText.svelte'
  import { DURATION_FAST } from '@/lib/animations/constants'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { cn } from '@/lib/utils/className'
  import { HighlightText, Paragraph } from '@/modules/main/components/Text'
  import { homeState } from '@/modules/main/contexts/HomeState'
</script>

<section
  class="chapter section"
  bind:this={homeState.aboutContainer1}
  style:--page-count={1}
  style:--page-size="100vh"
>
  <p
    class="p-8 text-center font-handwritting-body text-primary transition-all duration-200"
    {@attach squircleBackground({
      cornerRadius: 64,
      class: 'fill-white/80 z-0',
    })}
  >
    <RevealingText
      as="span"
      class="text-[1.5em] 2xl:text-[1.25em]"
      percent={utils.mapRange(homeState.aboutScrollProgress1, 0.25, 0.9, 0, 1)}
    >
      I’m a frontend developer who likes making things move — buttons, text,
      whole pages — anything that feels a little more alive than just sitting
      there.
      <br />
      I also love the idea of storytelling… though if we’re being honest, I’m not
      exactly a master at it.
      <br />
      <br />
      I didn’t follow some big career blueprint.
      <br />
      I just kept poking at stuff I found interesting, breaking things, fixing them
      (mostly), and slowly figuring out what I actually enjoy doing.
      <br />
      <br />
      Somewhere along the way, it turned into a job I actually like.
    </RevealingText>
    <br />
    <span
      class={cn(
        'relative text-center font-handwritting-body text-black/0 transition-all duration-100',
        { 'text-inherit': homeState.aboutScrollProgress1 >= 0.99 },
      )}
    >
      ...&nbsp;I guess&nbsp;....
    </span>
  </p>
</section>
<section
  class="chapter section lg:!max-w-[unset]"
  style:--page-count={1}
  style:--page-size="100vh"
  bind:this={homeState.aboutContainer2}
>
  {#if homeState.aboutVisibility2}
    <div
      transition:fade={{
        duration: DURATION_FAST,
      }}
      class="page fixed top-[unset] bottom-4 left-1/2 max-w-xl -translate-x-1/2 -translate-y-1/2 p-4 will-change-transform xl:left-1/4"
      style:transform={`translateY(${100 * (1 - homeState.aboutScrollProgress2) * 1.25}%)`}
    >
      <Paragraph class="p-6 text-primary-foreground" cornerRadius={32}>
        I’ve mostly been building things with
        <HighlightText>Next.js</HighlightText>, but lately I’ve been getting
        into
        <HighlightText>Svelte</HighlightText>
        <br />
        and I am loving it.
      </Paragraph>
      <!-- <BouncingText
        charClass="animate-"
        class="text-black"
        content="I'm frontend developer"
      /> -->
    </div>
  {/if}
</section>
