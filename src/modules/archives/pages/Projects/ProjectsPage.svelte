<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte'

  import BackButton from '@/components/Buttons/BackButton.svelte'
  import Link from '@/components/Links/Link.svelte'
  import PageTitle from '@/components/Text/PageTitle.svelte'
  import { roughBackground } from '@/lib/svelte/backgroundRough.svelte'
  import { useInView } from '@/lib/svelte/intersectionObserver.svelte'
  import { cn } from '@/lib/utils/className'

  import { SORTED_PROJECTS } from './constants'

  import type { Project } from './constants'

  let [titleRef, isInView] = useInView()
</script>

{#snippet header(label: string, hideOnMobile?: boolean)}
  <p
    class={cn('text-sm font-medium', {
      'hidden md:block': hideOnMobile,
    })}
  >
    {label}
  </p>
{/snippet}

{#snippet tag(tag: string)}
  <div
    {@attach roughBackground({
      shouldAnimate: true,
      fill: 'var(--secondary)',
    })}
  >
    <p class="relative px-2 py-1 text-sm">
      {tag}
    </p>
  </div>
{/snippet}

{#snippet item(
  { title, techStacks, description, href, company, year }: Project,
  index: number,
)}
  <p class="hidden text-sm md:block">{year}</p>
  <div class="hidden text-sm md:block">
    <p class="text-sm">{company}</p>
    {#if description}
      <p class="text-sm">{description}</p>
    {/if}
  </div>
  <p class="text-sm font-medium">{title}</p>
  <div class="flex flex-wrap gap-2">
    {#each techStacks as tagItem, index (index)}
      {@render tag(tagItem)}
    {/each}
  </div>
  <div class="justify-self-end">
    {#if href}
      <Link
        isExternal
        {href}
        aria-label="Visit"
        class="h-fit w-fit text-primary-foreground"
      >
        <IconExternalLink class="h-6 w-6" />
      </Link>
    {/if}
  </div>
  {#if index < SORTED_PROJECTS.length - 1}
    <hr class="col-span-5" />
  {/if}
{/snippet}

<div class="min-h-screen" bind:this={titleRef.current}>
  <section class="section space-y-16 py-20 md:py-30">
    <div class="space-y-4">
      <BackButton />
      <PageTitle content="Projects" isIn={isInView()} />
    </div>
    <div
      class="grid grid-cols-[3fr_4fr_1fr] gap-x-3 gap-y-2 md:grid-cols-[1fr_1fr_2fr_3fr_1fr]"
    >
      {@render header('Start year', true)}
      {@render header('Made at', true)}
      {@render header('Project')}
      {@render header('Built with')}
      <div></div>
      <hr class="col-span-5 mt-2 mb-4 border-2 border-tertiary-foreground" />
      {#each SORTED_PROJECTS as project, index (project.title)}
        {@render item(project, index)}
      {/each}
    </div>
  </section>
</div>
