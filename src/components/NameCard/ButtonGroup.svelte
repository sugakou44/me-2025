<script lang="ts">
  import {
    IconBrandGithubFilled,
    IconBrandLinkedinFilled,
    IconMailFilled,
  } from '@tabler/icons-svelte'

  import { CONTACT } from '@/lib/constants/contact'
  import { ROUTES } from '@/lib/constants/routes'
  import { cn } from '@/lib/utils/className'

  import MagnetButton from '../Buttons/MagnetButton.svelte'

  interface Props {
    isIn?: boolean
  }

  const { isIn }: Props = $props()
</script>

<div
  class={cn(
    'flex items-center justify-center gap-0 opacity-0 transition-opacity md:justify-start',
    {
      'opacity-100': isIn,
    },
  )}
>
  <MagnetButton
    containerClassName="md:mt-5 button"
    class="h-10"
    href={ROUTES.resume.pathname}
    isExternal
  >
    Resume
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-10 button"
    size="icon"
    href={CONTACT.email.href}
    aria-label={CONTACT.email.ariaLabel}
    isExternal
  >
    <IconMailFilled class="md:h-7 md:w-7" />
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-30 button"
    size="icon"
    href={CONTACT.github.href}
    aria-label={CONTACT.github.ariaLabel}
    isExternal
  >
    <IconBrandGithubFilled class="md:h-7 md:w-7" />
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-20 button"
    size="icon"
    href={CONTACT.linkedin.href}
    aria-label={CONTACT.linkedin.ariaLabel}
    isExternal
  >
    <IconBrandLinkedinFilled class="md:h-7 md:w-7" />
  </MagnetButton>
</div>

<style>
  div > :global(.button) {
    background-image: radial-gradient(
      var(--color-background) 50%,
      transparent 70%
    );
  }
</style>
