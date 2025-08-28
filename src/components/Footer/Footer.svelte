<script lang="ts">
  import {
    IconBrandGithubFilled,
    IconBrandLinkedinFilled,
    IconMailFilled,
  } from '@tabler/icons-svelte'
  import { page } from '$app/state'
  import { eases } from 'animejs'

  import Link from '@/components/Links/Link.svelte'
  import { CONTACT } from '@/lib/constants/contact'
  import { ROUTES } from '@/lib/constants/routes'
  import { appState } from '@/lib/contexts/AppState'
  import { windowState } from '@/lib/contexts/Window'
  import { squircleBackground } from '@/lib/svelte/backgroundSquircle.svelte'
  import { cn } from '@/lib/utils/className'
  import { CursorTheif } from '@/modules/main/components/CursorTheif'

  import BackButton from '../Buttons/BackButton.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    children?: Snippet
    haveGhost?: boolean
    class?: string
    contentContainerClass?: string
    ref?: HTMLElement
  }

  let {
    children,
    haveGhost = false,
    contentContainerClass,
    class: className,
    ref = $bindable(),
  }: Props = $props()
</script>

<footer
  bind:this={ref}
  class={cn('relative z-40 flex overflow-hidden', className)}
  {@attach squircleBackground({
    cornerRadius:
      eases.inSine(5 * appState.creditScrollProgress) *
      Math.max(windowState.windowWidth / 12, 24),
    bottomLeftCornerRadius: 0,
    bottomRightCornerRadius: 0,
    class: 'fill-tertiary-foreground',
  })}
>
  <section
    bind:this={appState.creditContainer}
    class="section md:pt:20 flex min-h-full flex-1 flex-col gap-6 !px-11 pt-14 !pb-6 text-white"
  >
    {#if !appState.hideBackButtonInFooter}
      <BackButton
        class="back-button-footer self-center !text-background"
        size="4xl"
        iconClass="w-8 h-8 md:w-10 md:h-10"
      />
    {/if}
    <div
      class={cn('relative flex flex-1 flex-col gap-4', contentContainerClass)}
    >
      {@render children?.()}
    </div>
    <hr class="w-[calc(100vw-88px)] self-center" />
    <div class="flex justify-between gap-4 text-sm md:text-md">
      <div class="flex gap-4">
        {#if page.url.pathname !== ROUTES.projectArchives.pathname}
          <Link class="no-underline" href={ROUTES.projectArchives.pathname}
            >Projects</Link
          >
        {/if}
        <Link class="no-underline" isExternal href={ROUTES.playground.pathname}>
          Playground
        </Link>
      </div>

      <div class="flex gap-4">
        <Link
          isExternal
          href={CONTACT.linkedin.href}
          aria-label={CONTACT.linkedin.ariaLabel}
        >
          <IconBrandLinkedinFilled />
        </Link>
        <Link
          isExternal
          href={CONTACT.github.href}
          aria-label={CONTACT.github.ariaLabel}
        >
          <IconBrandGithubFilled />
        </Link>
        <Link
          isExternal
          href={CONTACT.email.href}
          aria-label={CONTACT.email.ariaLabel}
        >
          <IconMailFilled />
        </Link>
      </div>
    </div>
  </section>
  {#if appState.isInCredit && haveGhost}
    <figure class="absolute right-1/5 bottom-2/5 hidden md:block">
      <CursorTheif />
    </figure>
  {/if}
</footer>
