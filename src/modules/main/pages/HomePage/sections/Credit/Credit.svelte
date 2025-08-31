<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte'

  import { Footer } from '@/components/Footer'
  import Link from '@/components/Links/Link.svelte'

  interface CreditItem {
    label: string
    href: string
    group?: string
  }

  const CREDIT_ITEMS: CreditItem[] = [
    {
      href: 'https://www.freepik.com/premium-photo/isolated-green-bamboo-leaves-element-3d-rendering_152768566.htm#fromView=search&page=2&position=14&uuid=3cdfaf1e-6c72-4a6d-a009-e01187116ab6&query=single+grass+blade',
      label: 'Grass blade by 「 vinkf 」',
      group: 'Texture',
    },
    {
      href: 'https://sketchfab.com/3d-models/box-man-3239592d03d849548e4563f07ad95614',
      label: 'Box Man by 「 Zhang Shangbin 」',
      group: 'model',
    },
  ]
</script>

{#snippet creditItem({ label, href, group }: CreditItem)}
  <li>
    <Link class="inline-flex actionable items-center gap-2" isExternal {href}>
      {#if group}
        <span class="text-[0.625em] opacity-60">
          [{group}]
        </span>
      {/if}
      {label}
      <IconExternalLink />
    </Link>
  </li>
{/snippet}

<Footer haveGhost class="">
  <h4 class="text-center text-white">Special Thanks</h4>
  <ul class="self-center">
    {#each CREDIT_ITEMS as item, index (index)}
      {@render creditItem(item)}
    {/each}
  </ul>
  <div class="flex-1"></div>
</Footer>
