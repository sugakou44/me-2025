<script lang="ts">
  import { EDUCATION } from '@/lib/constants/content'

  import Section from './Section.svelte'
</script>

<Section title="Education">
  {#each EDUCATION as { year, degree, school }, index (index)}
    <div class="flex flex-col gap-2">
      <div class="flex justify-between gap-2 font-medium">
        <h3>{school}</h3>
        <p
          class="year text-sm font-extralight text-nowrap text-zinc-900 underline"
        >
          {year}
        </p>
      </div>
      <p class="text-sm font-extralight">
        {degree}
      </p>
    </div>
  {/each}
</Section>

<style>
  h3 {
    font-size: var(--text-lg);
  }
</style>
