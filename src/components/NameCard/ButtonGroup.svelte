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
    href={ROUTES.resume.pathname}
    isExternal
  >
    Resume
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-20 button"
    size="icon"
    href={CONTACT.email.href}
    aria-label={CONTACT.email.ariaLabel}
    isExternal
  >
    <IconMailFilled class="md:h-7 md:w-7" />
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-10 button"
    class=""
    size="icon"
    href={CONTACT.github.href}
    aria-label={CONTACT.github.ariaLabel}
    isExternal
  >
    <IconBrandGithubFilled class="md:h-7 md:w-7" />
  </MagnetButton>
  <MagnetButton
    containerClassName="md:mt-15 button"
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
