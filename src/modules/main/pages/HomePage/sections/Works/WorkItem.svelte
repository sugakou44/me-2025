<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte'

  import { Button } from '@/components/Buttons'
  import { Tag } from '@/components/Tag'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { cn } from '@/lib/utils/className'
  import Subtext from '@/modules/main/components/Text/Subtext.svelte'

  import type { FeaturedProject } from '@/lib/constants/content'

  interface Props extends FeaturedProject {
    isFocusing?: boolean
  }

  let { title, description, techStacks, isFocusing, role, href }: Props =
    $props()
</script>

<div
  style:transition-property="shadow background"
  class={cn('relative rounded-full p-6 shadow-xl transition-opacity md:p-12', {
    'opacity-20 shadow-none md:opacity-50': !isFocusing,
  })}
  {@attach squircleBackground({
    cornerRadius: 64,
    class: 'fill-white z-0',
  })}
>
  <div class="relative flex flex-col items-center gap-4 md:items-start">
    <h3 class="text-center text-primary-foreground md:text-left">
      {title}
      {#if role}
        <Subtext class="block md:inline-block">[{role}]</Subtext>
      {/if}
    </h3>

    {#if description}
      <p class="text-center leading-normal md:text-left">
        {#if typeof description === 'string'}
          <!-- eslint-disable-next-line  svelte/no-at-html-tags -->
          {@html description}
        {:else}
          {@render description(isFocusing)}
        {/if}
      </p>
    {/if}

    <div class="flex flex-wrap justify-center gap-2 self-center">
      {#each techStacks as tag, index (index)}
        <Tag>
          {tag}
        </Tag>
      {/each}
    </div>
    {#if href}
      <Button isExternal {href} class="mt-2 self-center" variant="ghost">
        View Project
        <IconExternalLink class="ml-2 h-4 w-4" />
      </Button>
    {/if}
  </div>
</div>
