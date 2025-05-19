<script lang="ts">
  import { roughBackground } from '@/lib/svelte/backgroundRough.svelte'
</script>

<div class="relative">
  <svg {@attach roughBackground(true)}></svg>
  <div></div>
</div>
