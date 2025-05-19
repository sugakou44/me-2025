<script lang="ts">
  import DrawingText from '@/components/Text/DrawingText.svelte'
  import { roughBackground } from '@/lib/svelte/backgroundRough.svelte'
  import { intersectionObserver } from '@/lib/svelte/intersectionObserver.svelte'

  let isInView = $state(false)

  $inspect(isInView)
</script>

<DrawingText as="h2" content="Experience" isIn={true} class="section-title" />
<div
  class="relative h-screen w-full bg-red-50"
  {@attach intersectionObserver((state) => {
    isInView = state.isInView
  })}
>
  <svg class="absolute inset-0 h-full w-full" {@attach roughBackground(true)}
  ></svg>
  <div class="relative">asdasdasd</div>
</div>
