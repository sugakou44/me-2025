<script lang="ts">
  import { eases } from 'animejs'

  import { DURATION_SLOWER } from '@/lib/animations/constants'
  import { scaleY } from '@/lib/animations/transition'

  let finished = $state(false)

  $effect(() => {
    const timer = setTimeout(() => {
      finished = !finished
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  })

  $inspect(finished)
</script>

{#if !finished}
  <div
    out:scaleY={{
      duration: DURATION_SLOWER,
      easing: eases.inOutSine,
    }}
    class="fixed inset-0 z-[100] origin-top bg-primary"
  ></div>
{/if}
