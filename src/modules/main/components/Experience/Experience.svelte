<script lang="ts">
  import DrawingText from '@/components/Text/DrawingText.svelte'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { intersectionObserver } from '@/lib/svelte/intersectionObserver.svelte'

  let isInView = $state(false)
</script>

<DrawingText as="h2" content="Experience" isIn={true} class="section-title" />
<div
  class="relative h-40 w-fit p-4"
  {@attach squircleBackground({
    class:
      'fill-none stroke-4 [&>path]:scale-90 stroke-blue-400 [&>path]:origin-center [&>path]:transform-fill',
  })}
  {@attach intersectionObserver((state) => {
    isInView = state.isInView
  })}
>
  <div class="relative">123123</div>
</div>
