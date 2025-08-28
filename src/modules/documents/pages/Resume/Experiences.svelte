<script lang="ts">
  import { EXPERIENCE } from '@/lib/constants/content'

  import ExperienceItem from './ExperienceItem.svelte'
  import Section from './Section.svelte'
</script>

<Section title="Experience">
  {#each EXPERIENCE as { id, ...rest } (id)}
    <ExperienceItem {id} {...rest} />
  {/each}
</Section>
