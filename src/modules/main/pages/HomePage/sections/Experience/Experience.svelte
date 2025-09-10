<script lang="ts">
  import { EXPERIENCE } from '@/lib/constants/content'
  import { SectionHeader } from '@/modules/main/components/Text'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import ExperienceItem from './ExperienceItem.svelte'
</script>

<section
  class="chapter section flex flex-col gap-[25svh]"
  style:--page-size="120svh"
  bind:this={homeState.experienceContainer}
>
  <SectionHeader>Jobs</SectionHeader>
  <div class="flex flex-col gap-80">
    {#each EXPERIENCE as item, index (item.company)}
      <ExperienceItem {...item} {index} />
    {/each}
  </div>
</section>
