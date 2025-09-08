<script lang="ts">
  import { Tag } from '@/components/Tag'
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
    description,
    index: _index,
    id: _id,
  }: Props = $props()
</script>

<div class="relative">
  <div
    class="relative z-30 flex flex-col items-center gap-8 rounded-full p-6 text-center shadow-xl md:items-start md:p-12 md:text-left"
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
          <h3 class="text-primary-foreground">
            {company}
            <Subtext class="block text-sm md:inline-block">{year}</Subtext>
          </h3>
        </div>
        <h4>{role}</h4>
      </div>
      {#if description}
        <p>
          {#if typeof description === 'string'}
            <!-- eslint-disable-next-line  svelte/no-at-html-tags -->
            {@html description}
          {:else}
            {@render description()}
          {/if}
        </p>
      {/if}
    </div>

    <div class="flex flex-wrap justify-center gap-2 md:justify-start">
      {#each techStack as tech, index (index)}
        <Tag>
          {tech}
        </Tag>
      {/each}
    </div>
  </div>
</div>
