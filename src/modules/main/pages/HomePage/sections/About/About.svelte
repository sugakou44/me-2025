<script lang="ts">
  import { TECHSTACK_AS_ARRAY } from '@/lib/constants/content'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import HighlightText from '@/modules/main/components/Text/HighlightText.svelte'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import StackItem from './StackItem.svelte'

  let isIn = $state(false)

  $effect(() => {
    if (isIn && homeState.aboutScrollProgress < 0.1) {
      isIn = false
    } else if (!isIn && homeState.aboutScrollProgress > 0.3) {
      isIn = true
    }
  })
</script>

<section class="section min-h-screen" bind:this={homeState.aboutContainer}>
  <div
    class="p-8"
    {@attach squircleBackground({
      cornerRadius: 64,
      class: 'fill-white/80 z-0',
    })}
  >
    <p class="relative p-8 text-center text-primary-foreground">
      I’m a frontend developer who
      <HighlightText visible={isIn}>likes making things move</HighlightText> — buttons,
      text, whole pages — anything that feels a little more alive than just sitting
      there.
    </p>
    <p
      class="relative p-8 text-center text-primary-foreground transition-all duration-200"
    >
      Here are some of the programing languages and libraries I&apos;m currently
      using:
    </p>
    <ul class="relative flex flex-wrap justify-center gap-4">
      {#each TECHSTACK_AS_ARRAY as { name, Icon } (name)}
        <StackItem {name} {Icon} {isIn} />
      {/each}
    </ul>
  </div>
</section>
