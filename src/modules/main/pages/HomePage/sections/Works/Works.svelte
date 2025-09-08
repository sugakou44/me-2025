<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte'

  import { Button } from '@/components/Buttons'
  import { FEATURE_PROJECTS } from '@/lib/constants/content'
  import { ROUTES } from '@/lib/constants/routes'
  import { SectionHeader } from '@/modules/main/components/Text'
  import { homeState } from '@/modules/main/contexts/HomeState'

  import WorkItem from './WorkItem.svelte'
</script>

<SectionHeader>PROJECTS</SectionHeader>
<section
  class="chapter section mr-auto flex flex-col md:mr-[5vw] md:max-w-[50vw] xl:mr-[20vw] xl:!max-w-[30vw]"
>
  <div class="flex flex-col gap-[33vh]" bind:this={homeState.worksContainer}>
    {#each FEATURE_PROJECTS as project, index (index)}
      <WorkItem {...project} isFocusing={index === homeState.worksIndex} />
    {/each}
    <Button
      size="xl"
      variant="secondary"
      isExternal
      class="mx-auto border-4 uppercase"
      href={ROUTES.projectArchives.pathname}
      onclick={() => {
        homeState.hasClickedAllProject = true
      }}
    >
      and more <IconExternalLink class="ml-2 h-6 w-6" />
    </Button>
  </div>
</section>
