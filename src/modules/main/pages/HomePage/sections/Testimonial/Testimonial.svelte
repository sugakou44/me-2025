<script lang="ts">
  import { utils } from 'animejs'

  import RevealingText from '@/components/Text/RevealingText.svelte'
  import { cn } from '@/lib/utils/className'
  import { homeState } from '@/modules/main/contexts/HomeState'
</script>

<section class="section !py-0">
  <div class="relative flex items-center justify-center">
    <p
      bind:this={homeState.aboutContainer}
      class={cn(
        'py-10 text-center font-handwritting-body text-primary transition-all duration-200',
      )}
    >
      <RevealingText
        as="span"
        class="text-[1.25em]"
        percent={utils.mapRange(homeState.aboutScrollProgress, 0, 0.9, 0, 1)}
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
        I just kept poking at stuff I found interesting, breaking things, fixing
        them (mostly), and slowly figuring out what I actually enjoy doing.
        <br />
        <br />
        Somewhere along the way, it turned into a job I actually like.
      </RevealingText>
      <br />
      <span
        class={cn(
          'text-center font-handwritting-body  text-black/0 transition-all duration-100',
          { 'text-inherit': homeState.aboutScrollProgress >= 0.99 },
        )}
      >
        ...&nbsp;I guess&nbsp;....
      </span>
    </p>
  </div>
</section>
