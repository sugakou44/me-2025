<script lang="ts">
  import { roughBackground } from '@/lib/svelte/backgroundRough.svelte'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { Subtext } from '@/modules/main/components/Text'

  import type { ExperienceItem } from '@/lib/constants/content'

  interface Props extends ExperienceItem {
    index: number
  }

  let {
    techStack,
    company,
    year,
    role,
    paragraph,
    index: _index,
    id: _id,
  }: Props = $props()
</script>

<div class="relative">
  <div
    class="relative z-30 flex flex-col items-center gap-8 p-12 text-center md:items-start md:text-left"
    {@attach squircleBackground({
      cornerRadius: 64,
      class: 'fill-white',
    })}
  >
    <div class=" flex flex-col gap-4">
      <div class=" flex flex-col items-center gap-2 md:items-start">
        <div
          class="flex flex-col items-center md:flex-row md:items-baseline md:gap-2"
        >
          <h3 class="text-secondary-foreground">
            {company}
          </h3>
          <Subtext class="block text-sm text-secondary-foreground"
            >{year}</Subtext
          >
        </div>
        <h4>{role}</h4>
      </div>

      <p>
        {#if typeof paragraph === 'string'}
          <!-- eslint-disable-next-line  svelte/no-at-html-tags -->
          {@html paragraph}
        {:else}
          {@render paragraph()}
        {/if}
      </p>
    </div>

    <div class="flex flex-wrap gap-2">
      {#each techStack as tech, index (index)}
        <div
          {@attach roughBackground({
            shouldAnimate: true,
            fill: 'var(--secondary)',
          })}
        >
          <p class="relative px-2 py-1 text-md shadow-sm">
            {tech}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>
