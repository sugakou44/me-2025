<script lang="ts">
  import {
    EXPERIENCE,
    experienceDescription,
  } from './constants.experience.svelte'
  import Section from './Section.svelte'
</script>

<Section title="Experience">
  {#each EXPERIENCE as { key, company, year, role } (key)}
    <div class="flex flex-col gap-2">
      <h3 class="font-medium">{company}</h3>
      <div class="space-y-1">
        <p class="flex justify-between gap-2 text-sm">
          <span>{role}</span>
          <span class="year text-md font-extralight text-zinc-900 underline">
            {year}
          </span>
        </p>
        <div class="md:text- text-sm font-extralight">
          {@render experienceDescription(key)}
        </div>
      </div>
    </div>
  {/each}
</Section>
