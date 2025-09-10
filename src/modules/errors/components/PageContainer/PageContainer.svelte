<script lang="ts">
  const { children } = $props()
</script>

<div
  class="relative flex max-h-lvh min-h-dvh w-full flex-col items-center justify-center
  gap-4 overflow-hidden p-8 transition-none"
>
  {@render children()}
</div>
