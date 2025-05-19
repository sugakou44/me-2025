<script lang="ts">
  import { createTimeline, eases, stagger } from 'animejs'
  import { fade } from 'svelte/transition'

  import { DURATION_SLOWEST } from '@/lib/animations/constants'
  import { cn } from '@/lib/utils/className'

  interface Props {
    class?: string
    isVisible?: boolean
  }

  const { class: className, isVisible = true }: Props = $props()

  const timeline1 = createTimeline({
    loopDelay: DURATION_SLOWEST,
    autoplay: false,
    alternate: false,
    loop: true,
    defaults: {
      duration: DURATION_SLOWEST - 500,
      delay: stagger(100),
    },
  })

  const timeline2 = createTimeline({
    loopDelay: DURATION_SLOWEST,
    autoplay: false,
    alternate: false,
    loop: true,
    defaults: {
      duration: DURATION_SLOWEST,
    },
  })

  function timeline1Attachment(node: HTMLDivElement) {
    timeline1
      .label('start', 0)
      .add(
        node.children,
        {
          opacity: 0,
          translateX: '-10ch',
          duration: 0,
          delay: 0,
        },
        0,
      )
      .add(node.children, {
        opacity: 1,
        translateX: '0px',
        ease: eases.outCubic,
      })
      .add(
        node.children,
        {
          opacity: 0,
          translateX: '2ch',
          ease: eases.inCubic,
        },
        '+=4000',
      )

    timeline1.play()

    return () => {
      timeline1.complete()
      timeline1.remove(node.children)
    }
  }

  function timeline2Attachment(node: HTMLDivElement) {
    timeline2
      .label('start', 0)
      .add(node, { opacity: 0, scaleY: 0, duration: 0 }, 0)
      .call(() => {
        node.classList.toggle('origin-top', true)
        node.classList.toggle('origin-bottom', false)
      })
      .add(node, { opacity: 1, scaleY: 1, ease: eases.outCubic })
      .call(() => {
        node.classList.toggle('origin-top', false)
        node.classList.toggle('origin-bottom', true)
      })
      .add(node, { opacity: 0, scaleY: 0, ease: eases.inCubic }, '+=4000')

    timeline2.play()

    return () => {
      timeline2.complete()
      timeline2.remove(node)
    }
  }
</script>

{#if isVisible}
  <div in:fade={{}} class={cn('flex items-center justify-center', className)}>
    <div class="h-[7ch]">
      <hr
        class="origin h-full w-2 rounded-full bg-tertiary-foreground"
        {@attach timeline2Attachment}
      />
    </div>
    <p
      class="pointer-events-none flex max-w-0 origin-bottom-left rotate-90 gap-1 font-mono text-xs font-light uppercase md:text-sm"
      {@attach timeline1Attachment}
    >
      {#each 'SCROLL'.split('') as char, index (index)}
        <span>{char}</span>
      {/each}
    </p>
  </div>
{/if}
