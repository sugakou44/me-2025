<script lang="ts">
  import { Button } from '@/components/Buttons'
  import { CONTACT } from '@/lib/constants/contact'
  import { TECHSTACK_AS_ARRAY } from '@/lib/constants/content'
  import { annotate } from '@/lib/svelte/annotate.svelte'

  import Education from './Education.svelte'
  import Experiences from './Experiences.svelte'
</script>

<article class="space-y-4">
  <section class="space-y-4">
    <h1>Saran Angsuwan</h1>
    <div
      class="flex flex-col justify-between space-y-1 md:flex-row md:space-y-0 print:flex-row"
    >
      <p class="!text-sm">Bangkok, Thailand</p>
      <div class="space-y-1 md:space-y-2">
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
    <h3>Programming languages and libraries</h3>
    <ul class="flex flex-wrap gap-1">
      {#each TECHSTACK_AS_ARRAY as { name, Icon, shouldHighlight }, index (name)}
        <li
          class="flex flex-row items-center gap-1 !pl-0 !text-sm"
          {@attach annotate({
            visible: !!shouldHighlight,
            color: 'var(--secondary)',
            type: 'highlight',
            iterations: 1,
          })}
        >
          <Icon size={18} />
          <span
            >{name}
            {#if index !== TECHSTACK_AS_ARRAY.length - 1},{/if}
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
