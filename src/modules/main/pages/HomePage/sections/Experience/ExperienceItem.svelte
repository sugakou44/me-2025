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
    class="relative z-30 flex flex-col gap-8 p-12"
    {@attach squircleBackground({
      cornerRadius: 64,
      class: 'fill-white',
    })}
  >
    <div class=" flex flex-col gap-4">
      <div class=" flex flex-col gap-2">
        <div class=" flex items-baseline gap-2">
          <h3 class="text-secondary-foreground">
            {company}
            <Subtext class="text-sm">{year}</Subtext>
          </h3>
        </div>
        <h4>{role}</h4>
      </div>

      <p>{paragraph}</p>
    </div>

    <div class="flex gap-2">
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
