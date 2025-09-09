<script lang="ts">
  import { utils } from 'animejs'

  import RevealingText from '@/components/Text/RevealingText.svelte'
  import { cn } from '@/lib/utils/className'
  import Paragraph from '@/modules/main/components/Text/Paragraph.svelte'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import Spacer from '../../Spacer.svelte'
</script>

<section
  class="section chapter mb-20 flex flex-col items-center justify-center !py-0 md:mb-40"
  bind:this={homeState.epilogueContainer}
  style:--page-size="50vh"
>
  <Spacer />
  <Paragraph
    class="text-center font-handwritting-body"
    backgroundClass="fill-white/70 z-0"
  >
    <RevealingText
      class="relative text-[1.5em]"
      percent={utils.mapRange(homeState.epilogueScrollProgress, 0.4, 0.9, 0, 1)}
    >
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
        'relative inline-block text-[1.25em] text-primary opacity-100 transition-opacity duration-200',
        {
          'opacity-0': homeState.epilogueScrollProgress < 0.95,
        },
      )}
    >
      ...I guess...
    </span>
  </Paragraph>
</section>
