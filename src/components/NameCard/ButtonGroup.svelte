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

  const { isIn, ...props }: Props = $props()
</script>

<div
  {...props}
  class={cn(
    'flex items-center justify-center gap-0 opacity-0 transition-opacity lg:justify-start',
    {
      'opacity-100': isIn,
    },
  )}
>
  <MagnetButton
    containerClassName="namecard-button"
    class="h-10"
    href={ROUTES.resume.pathname}
    isExternal
  >
    Resume
  </MagnetButton>
  <MagnetButton
    containerClassName="lg:mt-5 namecard-button"
    size="icon"
    href={CONTACT.email.href}
    aria-label={CONTACT.email.ariaLabel}
    isExternal
  >
    <IconMailFilled class="lg:h-7 lg:w-7" />
  </MagnetButton>
  <MagnetButton
    containerClassName="lg:mt-25 namecard-button"
    size="icon"
    href={CONTACT.github.href}
    aria-label={CONTACT.github.ariaLabel}
    isExternal
  >
    <IconBrandGithubFilled class="lg:h-7 lg:w-7" />
  </MagnetButton>
  <MagnetButton
    containerClassName="lg:mt-15 namecard-button"
    size="icon"
    href={CONTACT.linkedin.href}
    aria-label={CONTACT.linkedin.ariaLabel}
    isExternal
  >
    <IconBrandLinkedinFilled class="lg:h-7 lg:w-7" />
  </MagnetButton>
</div>

<style>
  div > :global(.namecard-button) {
    background-image: radial-gradient(
      var(--color-background) 50%,
      transparent 70%
    );
  }
</style>
