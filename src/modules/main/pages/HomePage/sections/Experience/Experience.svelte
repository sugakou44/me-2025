<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte'

  import Button from '@/components/Buttons/Button.svelte'
  import { EXPERIENCE } from '@/lib/constants/content'
  import { ROUTES } from '@/lib/constants/routes'
  import { SectionHeader } from '@/modules/main/components/Text'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import ExperienceItem from './ExperienceItem.svelte'
</script>

<section
  class="chapter section flex flex-col gap-[50vh]"
  style:--page-size="120vh"
  bind:this={homeState.experienceContainer}
>
  <SectionHeader>Works</SectionHeader>
  <div class="flex flex-col gap-80">
    {#each EXPERIENCE as item, index (item.company)}
      <ExperienceItem {...item} {index} />
    {/each}
  </div>
  <Button
    size="xl"
    variant="secondary"
    isExternal
    class="mx-auto !h-14 rounded-none border-4 uppercase"
    href={ROUTES.projectArchives.pathname}
    onclick={() => {
      homeState.hasClickedAllProject = true
    }}
  >
    see all projects <IconExternalLink class="ml-2" />
  </Button>
</section>
