<script lang="ts">
  import { Button } from '@/components/Buttons'
  import { CONTACT } from '@/lib/constants/contact'
  import { annotate } from '@/lib/svelte/annotate.svelte'
  import { cn } from '@/lib/utils/className'

  import { STACK } from './constants'
  import Education from './Education.svelte'
  import Experiences from './Experiences.svelte'
</script>

<article class="space-y-4">
  <section class="space-y-4">
    <h1>Saran Angsuwan</h1>
    <div class="flex justify-between">
      <p class="!text-sm">Bangkok, Thailand</p>
      <div class="space-y-2">
        <p class="!text-sm">
          Email:
          <Button
            isExternal
            variant="link"
            href={CONTACT.email.href}
            class="text-sm text-primary-foreground"
          >
            {CONTACT.email.label}
          </Button>
        </p>
        <p class="!text-sm">
          Website:
          <Button
            isExternal
            variant="link"
            href={CONTACT.website.href}
            class="text-sm text-primary-foreground"
          >
            {CONTACT.website.label}
          </Button>
        </p>
      </div>
    </div>
  </section>
  <section class="space-y-2">
    <h3>Stack</h3>
    <ul class="flex flex-wrap gap-1">
      {#each STACK as { name, Icon, shouldHighlight }, index (name)}
        <li
          use:annotate={{
            visible: !!shouldHighlight,
            color: 'var(--secondary)',
            type: 'highlight',
            iterations: 1,
          }}
          class={cn('flex flex-row items-center gap-1 !text-sm', {
            '!pl-0': index === 0,
          })}
        >
          <Icon size={18} />
          <span
            >{name}
            {#if index !== STACK.length - 1},{/if}
          </span>
        </li>
      {/each}
    </ul>
  </section>
  <hr />
  <Experiences />
  <hr />
  <Education />
</article>

<style>
  :global(.year) {
    font-size: var(--text-sm) !important;
  }
</style>
