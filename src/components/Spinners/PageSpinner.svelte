<script lang="ts">
  import JumpingSpinner from './JumpingSpinner.svelte'
</script>

<div
  class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-primary duration-500"
>
  <JumpingSpinner />

  <p class="flex font-mono text-lg font-medium text-white">
    {#each '...LOADING...'.split('') as char, index (index)}
      <span
        class="block animate-bounce"
        style:animation-delay={`${index * 100}ms`}
      >
        {char}
      </span>
    {/each}
  </p>
</div>
