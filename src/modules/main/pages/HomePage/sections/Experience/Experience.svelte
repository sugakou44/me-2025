<script lang="ts">
  import { EXPERIENCE } from '@/lib/constants/content'
  import { SectionHeader } from '@/modules/main/components/Text'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import ExperienceItem from './ExperienceItem.svelte'
</script>

<section
  class="chapter section space-y-80"
  style:--page-size="120vh"
  bind:this={homeState.experienceContainer}
>
  <SectionHeader>Works</SectionHeader>
  {#each EXPERIENCE as item, index (item.company)}
    <ExperienceItem {...item} {index} />
  {/each}
</section>
