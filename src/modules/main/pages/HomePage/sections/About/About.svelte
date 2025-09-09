<script lang="ts">
  import { TECHSTACK_AS_ARRAY } from '@/lib/constants/content'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { useInView } from '@/lib/svelte/intersectionObserver.svelte'
  import { cn } from '@/lib/utils/className'
  import HighlightText from '@/modules/main/components/Text/HighlightText.svelte'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import StackItem from './StackItem.svelte'

  let [containerRef, isInView] = useInView({ once: true })
</script>

<section class="section min-h-screen" bind:this={homeState.aboutContainer}>
  <div
    class="relative p-8"
    bind:this={containerRef.current}
    {@attach squircleBackground({
      cornerRadius: 64,
      class: 'fill-white/90 z-0',
    })}
  >
    <p class="relative p-8 text-center text-primary-foreground">
      I’m a frontend developer who
      <HighlightText visible={isInView()}
        >likes making things move</HighlightText
      > — buttons, text, whole pages — anything that feels a little more alive than
      just sitting there.
    </p>
    <p
      class="relative p-8 text-center text-primary-foreground transition-all duration-200"
    >
      Here are some of the programing languages and libraries I&apos;m currently
      using:
    </p>
    <ul class="relative flex flex-wrap justify-center gap-4">
      {#each TECHSTACK_AS_ARRAY as { name, Icon } (name)}
        <StackItem {name} {Icon} isIn={isInView()} />
      {/each}
    </ul>
  </div>
</section>
