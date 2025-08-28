<script lang="ts">
  import {
    IconBrandGithubFilled,
    IconBrandLinkedinFilled,
    IconMailFilled,
  } from '@tabler/icons-svelte'

  import { CONTACT } from '@/lib/constants/contact'
  import { ROUTES } from '@/lib/constants/routes'

  import MagnetButton from '../Buttons/MagnetButton.svelte'

  const props = $props()
</script>

<div {...props} class="flex items-center justify-center gap-0 md:justify-start">
  <MagnetButton
    containerClassName="md:mt-5 button"
    class="h-10"
    href={ROUTES.resume.pathname}
    isExternal
  >
    Resume
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-10 button lg:scale-130"
    size="icon"
    href={CONTACT.email.href}
    aria-label={CONTACT.email.ariaLabel}
    isExternal
  >
    <IconMailFilled class="md:h-7 md:w-7" />
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-30 button lg:scale-100 "
    size="icon"
    href={CONTACT.github.href}
    aria-label={CONTACT.github.ariaLabel}
    isExternal
  >
    <IconBrandGithubFilled class="md:h-7 md:w-7" />
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-20 button lg:scale-120"
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
