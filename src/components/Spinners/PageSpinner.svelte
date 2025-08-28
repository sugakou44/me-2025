<script lang="ts">
  import { DURATION_SLOWEST } from '@/lib/animations/constants'
  import { scaleY } from '@/lib/animations/transition'

  import BouncingText from '../Text/BouncingText.svelte'
  import JumpingSpinner from './JumpingSpinner.svelte'
</script>

<div
  out:scaleY|global={{ duration: DURATION_SLOWEST }}
  class="fixed inset-0 z-50 flex origin-top flex-col items-center justify-center gap-8 bg-primary duration-500"
>
  <JumpingSpinner />

  <BouncingText content="...LOADING..." />
</div>
